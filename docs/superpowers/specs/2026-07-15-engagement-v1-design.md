# 陀氏人格测验 · 吸引力增强 v1 设计

日期：2026-07-15  
状态：已实现（2026-07-15）  
约束：少写新文案，优先改产品与交互；计分与角色库不变

---

## 1. 目标与非目标

### 目标（ABCD 全覆盖，首发可交付）

| 维度 | 手段 |
| --- | --- |
| A 传播 | 分享标题沿用 `shareHook`；长图补充暗影搭档（及空间允许时的 `nextStep` 短句） |
| B 过程趣味 | 闪卡遇见记入收集；结果页「本场遇见」回顾 |
| C 结果「被看穿」 | 结果揭幕节奏；露出未用字段 `nextStep`；深描分段呈现 |
| D 复访 | **持久图鉴**（本地存储）；进度 `已遇见 X / 36`；预留上云同步 |

### 非目标（首发不做）

- 双人对照 / 答卷码 PK
- 按书短测、反向抉择模式
- 新题、新角色、新长文案
- 图鉴进度写入分享图
- 云同步实现（只预留接口与合并策略）

---

## 2. 用户流程

仍为单页三态（`start` / `quiz` / `result`），图鉴用 overlay（必要时再拆 `pages/gallery`）。

1. **开场**  
   - 现有文案保留  
   - 若本地已有解锁：展示 `已遇见 X / 36` +「打开图鉴」  
   - 可加一句固定壳文案：答完将获得人格与本场遇见回顾（不新写角色向文案）

2. **答题**  
   - 交互与计分不变  
   - 每次闪卡出现：将 `flash.characterId` 记入会话列表 `sessionMetIds`（去重，保序）  
   - **不**在答题中弹「图鉴 +1」，以免打断节奏

3. **结果揭幕**（同页分段显现，可滚动；允许轻量进入动画）  
   1. 揭晓带：绰号 → 姓名 →《书》→ tagline → 匹配度；隐藏角色角标逻辑不变  
   2. 读心带：特质分析 + 双雷达（现有）  
   3. 深描带：整体画像 / 锋芒 / 盲区 / 关系 / 成长（现有）  
   4. 下一步：展示角色字段 `nextStep`；区块标题用固定壳文案「今晚可以去感受」  
   5. 暗影搭档：现有卡片 + 固定壳文案「若命运再偏一点」  
   6. 本场遇见：横向头像条（`sessionMetIds` ∪ 主人格 ∪ 暗影）；相对本地图鉴的新解锁打「新」  
   7. 行动区：分享 / 存图 / 漫画 / 再测 / **打开图鉴**

4. **落盘**  
   - 进入结果时调用 `unlock(sessionMetIds + primaryId + shadowId)`，带来源标签

---

## 3. 图鉴交互

- 顶栏：`已遇见 X / 36`（X 为已解锁人数；总数取 `characters.length`）
- 网格：
  - **已解锁**：肖像 + 名 + `epithet`；点击看 `tagline` + `summary`（复用字段）
  - **未解锁**：剪影 +「尚未照面」；点击不暴露姓名，提示固定壳文案「再答一轮，或许会遇见」
- 可选：本场新解锁置顶一栏
- 隐藏角色：未解锁时不剧透；解锁后与常人相同展示（与现有结果页隐藏逻辑一致：只有测到才揭晓）

---

## 4. 分享

- 转发标题：继续 `primary.shareHook`
- 长图：在现有构图上增加暗影一行；若高度仍宽裕再加 `nextStep` 一行（过长则只保留暗影）
- 图鉴进度不进分享图

---

## 5. 数据与模块

### 5.1 模块

- 新增 `miniprogram/utils/collection.js`：唯一读写入口  
- API：
  - `getState()`
  - `unlock(ids, meta)` — `meta.sources` 为来源数组
  - `getProgress()` → `{ unlocked, total }`
  - `listForGallery(characters)` → 供 UI 的已/未解锁视图模型
  - `exportForSync()` / `importFromSync(payload)` — 首发本地可用；云端调用点 no-op 或注释预留
- 页面不直接调用 `wx.setStorage` / `wx.getStorage`

### 5.2 本地存储

- Key：`dos.collection.v1`
- Schema：

```js
{
  version: 1,
  unlocked: {
    [characterId]: {
      firstAt: number,   // ms
      lastAt: number,
      sources: string[]  // "flash" | "primary" | "shadow"
    }
  },
  lastResult: {
    primaryId: string,
    shadowId: string,
    at: number
  } | null
}
```

- `unlock`：按 id 合并；已存在则更新 `lastAt`，`sources` 做集合并；`firstAt` 不回拨
- 未解锁角色不写入姓名或文案，只存 id

### 5.3 会话态（不落盘）

- `sessionMetIds: string[]` — 本场闪卡顺序去重
- 结果渲染用；结束后写入持久层

### 5.4 上云预留（不实现）

- sync payload = `exportForSync()` 的 JSON
- 合并策略：按 `characterId` union；`firstAt` 取更早；`lastAt` 取更晚；`sources` 集合并
- 云函数名预留注释：`syncCollection`

### 5.5 错误处理

- 读失败 → 视为空图鉴，不阻断测验
- 写失败 → toast「收藏未保存」，结果页仍完整展示

---

## 6. 文案策略（固定壳，不扩写角色库）

允许新增的**仅**固定 UI 壳文案，例如：

- 「今晚可以去感受」
- 「若命运再偏一点」
- 「尚未照面」
- 「再答一轮，或许会遇见」
- 「本场遇见」
- 「我的陀氏图鉴」
- 「已遇见 X / 36」
- 「新」

角色侧一律复用：`epithet` / `tagline` / `summary` / `nextStep` / `shareHook` / 闪卡 `who`+`line` 等既有字段。

---

## 7. 测试要点

- 同人闪卡多次 → 持久层仅一条；`sources` 含 `flash`
- 主人格 / 暗影写入后 `sources` 含对应标签
- 杀进程重开 → 进度仍在
- 清缓存 → 进度归零（预期）
- 隐藏角色未测中 → 图鉴不露名
- 存储写失败 → 测验可完成，有 toast
- `nextStep` 在结果页可见
- 分享长图含暗影信息（在布局允许时）

---

## 8. 实现落点（供计划引用）

| 区域 | 文件（预期） |
| --- | --- |
| 收集逻辑 | `miniprogram/utils/collection.js`（新） |
| 答题/结果 | `miniprogram/pages/quiz/quiz.js` / `.wxml` / `.wxss` |
| 分享图 | `miniprogram/utils/share.js` |
| 角色数据 | 只读；不改计分 `quiz.js` 核心匹配 |

---

## 9. 决策记录

- 路线：结果放大镜 + 持久图鉴（双人对照等留二期）
- 成本偏好：产品/交互优先，少写内容
- 持久化：本地先上，接口预留以后上云（选项 C）
- 图鉴入口：首发 overlay，避免过早拆页
