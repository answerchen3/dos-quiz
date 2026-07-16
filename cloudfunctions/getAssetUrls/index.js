const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
})

/** 仅允许换取 quiz/ 前缀下的云素材（与 quickstartFunctions 内嵌换链同源） */
const ALLOWED_FILE_PREFIX =
  'cloud://cloud1-d5gw2jt7af9f83de9.636c-cloud1-d5gw2jt7af9f83de9-1453135575/quiz/'

function isAllowedFileId(id) {
  return typeof id === 'string' && id.indexOf(ALLOWED_FILE_PREFIX) === 0
}

/**
 * 服务端换取云文件临时 https 链接。
 * 免费档存储「仅创建者可读写」时，客户端 getTempFileURL 会 STORAGE_EXCEED_AUTHORITY，
 * 云函数以管理端权限调用即可绕过。
 *
 * event.fileList: string[] cloud:// file IDs（建议 ≤50）
 * 非法（非 quiz/）File ID：拒绝且不换链
 */
exports.main = async (event) => {
  var fileList = (event && event.fileList) || []
  if (!Array.isArray(fileList)) fileList = []
  fileList = fileList.filter(Boolean).slice(0, 50)

  if (!fileList.length) {
    return { fileList: [] }
  }

  var allowed = []
  var rejected = []
  fileList.forEach(function (id, index) {
    if (isAllowedFileId(id)) {
      allowed.push({ id: id, index: index })
    } else {
      rejected.push({
        fileID: id,
        status: 403,
        errMsg: 'fileID not in allowed quiz/ prefix',
      })
    }
  })

  var resolved = []
  if (allowed.length) {
    var resp = await cloud.getTempFileURL({
      fileList: allowed.map(function (item) {
        return item.id
      }),
    })
    resolved = (resp && resp.fileList) || []
  }

  var out = new Array(fileList.length)
  allowed.forEach(function (item, j) {
    out[item.index] = resolved[j] || {
      fileID: item.id,
      status: 500,
      errMsg: 'getTempFileURL missing item',
    }
  })
  rejected.forEach(function (item) {
    var idx = fileList.indexOf(item.fileID)
    if (idx >= 0) out[idx] = item
  })

  return { fileList: out }
}
