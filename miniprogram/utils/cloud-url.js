/**
 * 将 cloud:// File ID 转为可给 <image> 使用的 https 临时链。
 * 部分基础库/场景下 cloud:// 会被误当成相对路径（/pages/xxx/cloud://...）。
 */
function toDisplayUrl(src) {
  if (!src) return Promise.resolve('')
  var url = String(src)
  if (url.indexOf('cloud://') !== 0) return Promise.resolve(url)
  if (!wx.cloud || !wx.cloud.getTempFileURL) {
    return Promise.reject(new Error('云能力不可用'))
  }
  return wx.cloud
    .getTempFileURL({ fileList: [url] })
    .then(function (res) {
      var file = res.fileList && res.fileList[0]
      if (file && file.tempFileURL) return file.tempFileURL
      var errMsg = (file && file.errMsg) || 'getTempFileURL failed'
      return Promise.reject(new Error(errMsg))
    })
}

function toDisplayUrls(srcs) {
  var list = (srcs || []).filter(Boolean)
  if (!list.length) return Promise.resolve([])
  var cloudIds = []
  var indexMap = []
  list.forEach(function (src, i) {
    if (String(src).indexOf('cloud://') === 0) {
      indexMap.push({ i: i, cloud: true, idx: cloudIds.length })
      cloudIds.push(src)
    } else {
      indexMap.push({ i: i, cloud: false })
    }
  })
  if (!cloudIds.length) return Promise.resolve(list.slice())

  if (!wx.cloud || !wx.cloud.getTempFileURL) {
    return Promise.reject(new Error('云能力不可用'))
  }

  return wx.cloud.getTempFileURL({ fileList: cloudIds }).then(function (res) {
    var files = (res && res.fileList) || []
    return list.map(function (src, i) {
      var meta = indexMap[i]
      if (!meta.cloud) return src
      var file = files[meta.idx]
      return (file && file.tempFileURL) || src
    })
  })
}

module.exports = {
  toDisplayUrl: toDisplayUrl,
  toDisplayUrls: toDisplayUrls,
}
