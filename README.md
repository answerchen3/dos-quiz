# 测测你的陀氏人格（dos-quiz）

微信小程序 + 云开发。测验逻辑已从 `miniprogram-1` 迁入本仓库。

## 包体积（重要）

微信**主包 ≤ 2MB**。本仓库策略：

- **进包**：代码 + `assets/placeholders/` + `assets/dostoevsky-start.jpg`（约几十 KB）
- **上云**：肖像 / 闪卡场景 / 漫画 / 雪景 → `upload-to-cloud/quiz/`，运行时按 `CLOUD_ASSET_PREFIX` 拉取
- 未配置云前缀时，大图一律回落占位图，保证能编译上传

## 信息架构

底部三栏：

1. **测试** — 人格测验（开场 / 答题 / 结果）
2. **社区** — 交流社区（首版占位「即将开放」）
3. **我的** — 图鉴进度、上次结果、回测入口

## 本地预览

1. 用微信开发者工具打开本目录（`WeChatProjects/dos-quiz`）
2. 确认 AppID 为已开通云开发的账号
3. **先上传云素材并配置 `config.js`**（见下），再编译
4. 未配云时也能打开测验，但肖像/场景多为占位图

## 云存储高清图（必做）

高清原图在（本地目录，**不进 git / 不进主包**）：

```
upload-to-cloud/quiz/
  portraits/
  scenes/
  comics/         # 分书漫画速览
  scenery/        # 开场雪景
  bgs/            # 角色背景（答题页按书主角换皮）
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
   - `quiz/bgs/*-bg.png`
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
  miniprogram/          # 小程序代码（主包应 <2MB）
    pages/quiz/
    utils/
    assets/             # 仅占位 + 开场图
  cloudfunctions/
  upload-to-cloud/      # 高清资源，上传云存储，勿打进包
```

## 参考

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)
- [代码包限制](https://developers.weixin.qq.com/miniprogram/dev/framework/subpackages.html)
