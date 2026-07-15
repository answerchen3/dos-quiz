const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
})

/**
 * 服务端换取云文件临时 https 链接。
 * 免费档存储「仅创建者可读写」时，客户端 getTempFileURL 会 STORAGE_EXCEED_AUTHORITY，
 * 云函数以管理端权限调用即可绕过。
 *
 * event.fileList: string[] cloud:// file IDs（建议 ≤50）
 */
exports.main = async (event) => {
  var fileList = (event && event.fileList) || []
  if (!Array.isArray(fileList)) fileList = []
  fileList = fileList.filter(Boolean).slice(0, 50)
  if (!fileList.length) {
    return { fileList: [] }
  }
  return cloud.getTempFileURL({ fileList: fileList })
}
