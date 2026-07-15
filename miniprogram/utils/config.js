/**
 * 云存储资源配置（主包 ≤2MB：大图不进包，一律走云）
 *
 * 环境 ID 已写在 app.js：cloud1-d5gw2jt7af9f83de9
 *
 * 配置 CLOUD_ASSET_PREFIX：
 * 1. 云开发 → 存储，上传 upload-to-cloud/quiz/（含 bgs / portraits / scenes…）
 * 2. 点开任意文件，复制 File ID，例如：
 *    cloud://cloud1-d5gw2jt7af9f83de9.636c-xxxx/quiz/portraits/raskolnikov.jpg
 * 3. 截到 quiz 这一层填到下面，例如：
 *    cloud://cloud1-d5gw2jt7af9f83de9.636c-xxxx/quiz
 *
 * 留空则肖像/场景/bg 走占位图。
 */
module.exports = {
  CLOUD_ENV_ID: 'cloud1-d5gw2jt7af9f83de9',
  CLOUD_ASSET_PREFIX: '',
}
