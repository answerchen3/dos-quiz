/**
 * 云存储资源配置（主包 ≤2MB：大图不进包，一律走云）
 *
 * 1. 打开开发者工具 → 云开发 → 存储
 * 2. 把项目根目录 upload-to-cloud/quiz/ 整个文件夹上传到云存储（保持 quiz/ 目录结构）
 *    含 portraits / scenes / comics / scenery
 * 3. 在存储里点开任意文件，复制 File ID，形如：
 *    cloud://env-xxxxx.xxxx/quiz/portraits/raskolnikov.jpg
 * 4. 把下面 CLOUD_ASSET_PREFIX 改成到 quiz 这一层的前缀，例如：
 *    cloud://env-xxxxx.xxxx/quiz
 * 5. （可选）在 app.js 填入云环境 ID
 * 6. 重新编译；肖像 / 闪卡场景 / 漫画 / 雪景走云端
 *
 * 留空时：仅开场图 + placeholder 可用，其余显示占位图（便于本地编译过 2MB）。
 */
module.exports = {
  CLOUD_ASSET_PREFIX: '',
}
