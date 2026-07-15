/**
 * 云存储资源配置
 *
 * 1. 打开开发者工具 → 云开发 → 存储
 * 2. 把项目根目录 upload-to-cloud/quiz/ 整个文件夹上传到云存储（保持 quiz/ 目录结构）
 *    含 portraits / scenes / comics / scenery
 * 3. 在存储里点开任意文件，复制 File ID，形如：
 *    cloud://env-xxxxx.xxxx/quiz/portraits/raskolnikov.jpg
 * 4. 把下面 CLOUD_ASSET_PREFIX 改成到 quiz 这一层的前缀，例如：
 *    cloud://env-xxxxx.xxxx/quiz
 * 5. 重新编译；高清图、漫画将走云存储
 *
 * 留空则：本地 portraits/scenes/scenery 可用；
 * comics 大图需云端，未配置时漫画仍显示旁白。
 */
module.exports = {
  CLOUD_ASSET_PREFIX: '',
}
