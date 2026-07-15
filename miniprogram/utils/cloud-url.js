/**
 * 将 cloud:// File ID 转为可给 <image> 使用的 https 临时链。
 *
 * 免费档存储往往不能「所有用户可读」，客户端 getTempFileURL 会报
 * STORAGE_EXCEED_AUTHORITY。因此统一走云函数 getAssetUrls（管理端权限）。
 */

var cache = {}
var CACHE_MS = 50 * 60 * 1000

function isCloudId(src) {
  return !!(src && String(src).indexOf('cloud://') === 0)
}

function safeDisplayUrl(url) {
  if (!url) return ''
  var s = String(url)
  if (s.indexOf('cloud://') === 0) return ''
  return s
}

function cacheGet(id) {
  var hit = cache[id]
  if (!hit) return ''
  if (Date.now() - hit.at > CACHE_MS) {
    delete cache[id]
    return ''
  }
  return hit.url || ''
}

function cacheSet(id, url) {
  if (!id || !url) return
  cache[id] = { url: url, at: Date.now() }
}

function resolveViaCloudFunction(cloudIds) {
  if (!wx.cloud || !wx.cloud.callFunction) {
    return Promise.reject(new Error('云能力不可用'))
  }
  return wx.cloud
    .callFunction({
      name: 'getAssetUrls',
      data: { fileList: cloudIds },
    })
    .then(function (res) {
      var result = (res && res.result) || {}
      return result.fileList || []
    })
}

function toDisplayUrl(src) {
  if (!src) return Promise.resolve('')
  var url = String(src)
  if (!isCloudId(url)) return Promise.resolve(url)
  var cached = cacheGet(url)
  if (cached) return Promise.resolve(cached)

  return resolveViaCloudFunction([url]).then(function (files) {
    var file = files[0]
    if (file && file.tempFileURL) {
      cacheSet(url, file.tempFileURL)
      return file.tempFileURL
    }
    var errMsg =
      (file && (file.errMsg || file.statusMsg)) ||
      'getAssetUrls failed: ' + url
    console.error('[cloud-url]', errMsg, file)
    return Promise.reject(new Error(errMsg))
  })
}

function toDisplayUrls(srcs) {
  var list = (srcs || []).map(function (s) {
    return s || ''
  })
  if (!list.length) return Promise.resolve([])

  var cloudIds = []
  var cloudAt = []
  var out = list.slice()

  list.forEach(function (src, i) {
    if (!isCloudId(src)) return
    var cached = cacheGet(src)
    if (cached) {
      out[i] = cached
      return
    }
    cloudAt.push(i)
    cloudIds.push(src)
  })

  if (!cloudIds.length) return Promise.resolve(out)

  return resolveViaCloudFunction(cloudIds).then(function (files) {
    cloudAt.forEach(function (listIndex, j) {
      var file = files[j]
      var id = cloudIds[j]
      if (file && file.tempFileURL) {
        cacheSet(id, file.tempFileURL)
        out[listIndex] = file.tempFileURL
      } else {
        console.error(
          '[cloud-url] item failed',
          id,
          file && (file.errMsg || file.status),
        )
        out[listIndex] = ''
      }
    })
    return out
  })
}

module.exports = {
  isCloudId: isCloudId,
  safeDisplayUrl: safeDisplayUrl,
  toDisplayUrl: toDisplayUrl,
  toDisplayUrls: toDisplayUrls,
}
