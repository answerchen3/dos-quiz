# 测测你的陀氏人格（dos-quiz）

微信小程序 + 云开发。测验逻辑已从 `miniprogram-1` 迁入本仓库。

## 本地预览

1. 用微信开发者工具打开本目录（`WeChatProjects/dos-quiz`）
2. 确认 AppID 为已开通云开发的账号
3. 编译后应直接进入测验开场页

未配置云图前，使用本地压缩图（`miniprogram/assets`），包体约 1.2MB。

## 云存储高清图（推荐）

高清原图已准备在：

```
upload-to-cloud/quiz/
  portraits/
  scenes/
  comics/         # 分书漫画速览
  scenery/        # 开场雪景
  dostoevsky-start.jpg
  placeholders/
```

### 上传步骤

1. 开发者工具顶部点 **云开发** → **存储**
2. 新建文件夹 `quiz`（若没有）
3. 将 `upload-to-cloud/quiz/` 下内容上传进去，保持目录结构：
   - `quiz/portraits/*.jpg`
   - `quiz/scenes/*.jpg`
   - `quiz/comics/<书slug>/page-*.jpg`
   - `quiz/scenery/*.jpg`
   - `quiz/dostoevsky-start.jpg`
   - `quiz/placeholders/stavrogin.jpg`
4. 在存储中点开任意文件，复制 File ID，例如：
   `cloud://env-xxxxx.xxxx/quiz/portraits/raskolnikov.jpg`
5. 编辑 `miniprogram/utils/config.js`：

```js
module.exports = {
  CLOUD_ASSET_PREFIX: 'cloud://env-xxxxx.xxxx/quiz', // 改到 quiz 这一层
}
```

6. （可选）在 `miniprogram/app.js` 填入云环境 ID：

```js
env: 'env-xxxxx',
```

仅有一个环境时可留空。

7. 重新编译。页面与闪卡将加载云端高清图；分享图会自动 `getTempFileURL` 再绘制。

### 存储权限

开发期：读 → 所有用户可读；写 → 仅管理端。

## 目录说明

```
dos-quiz/
  miniprogram/          # 小程序代码
    pages/quiz/         # 测验三态页
    utils/              # 计分 / 雷达 / 分享 / 数据 / 云配置
    assets/             # 本地压缩图兜底
  cloudfunctions/       # 云函数（模板可保留）
  upload-to-cloud/      # 待上传的高清资源（勿打进小程序包）
```

## 参考

- 内容源站：`/Users/answerchen/MyApp/dostoevsky-quiz`
- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)
