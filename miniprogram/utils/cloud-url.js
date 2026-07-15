/**
 * 将 cloud:// File ID 转为可给 <image> 使用的 https 临时链。
 * 切勿把 cloud:// 直接塞给 image：会被解析成 /pages/xxx/cloud://... 本地路径。
 */

function isCloudId(src) {
  return !!(src && String(src).indexOf('cloud://') === 0)
}

/** 展示用 URL：禁止返回 cloud:// */
function safeDisplayUrl(url) {
  if (!url) return ''
  var s = String(url)
  if (s.indexOf('cloud://') === 0) return ''
  return s
}

function toDisplayUrl(src) {
  if (!src) return Promise.resolve('')
  var url = String(src)
  if (!isCloudId(url)) return Promise.resolve(url)
  if (!wx.cloud || !wx.cloud.getTempFileURL) {
    return Promise.reject(new Error('云能力不可用'))
  }
  return wx.cloud
    .getTempFileURL({ fileList: [url] })
    .then(function (res) {
      var file = res.fileList && res.fileList[0]
      if (file && file.tempFileURL) return file.tempFileURL
      var errMsg =
        (file && (file.errMsg || file.statusMsg)) ||
        'getTempFileURL failed: ' + url
      console.error('[cloud-url]', errMsg, file)
      return Promise.reject(new Error(errMsg))
    })
}

/**
 * 保持与入参数组等长（含空串），不要 filter，避免下标错位。
 */
function toDisplayUrls(srcs) {
  var list = (srcs || []).map(function (s) {
    return s || ''
  })
  if (!list.length) return Promise.resolve([])

  var cloudIds = []
  var cloudAt = []
  list.forEach(function (src, i) {
    if (isCloudId(src)) {
      cloudAt.push(i)
      cloudIds.push(src)
    }
  })
  if (!cloudIds.length) return Promise.resolve(list.slice())

  if (!wx.cloud || !wx.cloud.getTempFileURL) {
    return Promise.reject(new Error('云能力不可用'))
  }

  return wx.cloud.getTempFileURL({ fileList: cloudIds }).then(function (res) {
    var files = (res && res.fileList) || []
    var out = list.slice()
    cloudAt.forEach(function (listIndex, j) {
      var file = files[j]
      if (file && file.tempFileURL) {
        out[listIndex] = file.tempFileURL
      } else {
        console.error(
          '[cloud-url] item failed',
          cloudIds[j],
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
