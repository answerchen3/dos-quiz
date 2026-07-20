# 结果页文本审查 Prompt（除已订正标题与简介）

> 用途：粘贴到 Cursor / 任意 LLM，对 dos-quiz 结果页角色文案做合规与调性审查。
> 同目录参考：`multitask-optimize-agents.md`（总控）、`iteration-changelog-phase-b.md`（P0-6/P1-11 由来）。

## 可复制 Prompt

~~~~markdown
# 任务：审查 dos-quiz 结果页文本（除已订正标题与简介）

## 范围
仅审 `docs/quiz-content-v1.md` 与 `miniprogram/utils/characters-data.js` 中每个角色的：`tags`（3 条）、`nextStep`、`shareHook`、`strengths`、`blindSpot`、`inRelation`、`growth`。**跳过** `name`/`epithet`/`tagline`/`summary`（已订正）。

## 红线（必改）
1. **合规**：禁「精神病院/精神病/幻觉（病理义）/像一种病/请就医」等医疗隐喻或诊断腔指向用户。
2. **高敏角色轻触**：纳斯塔霞弱化「自毁」、改「悬崖边试探」语感；罗戈任弱化对用户的「窒息/毁灭」判决；斯塔夫罗金不渲染「空心/沉没」宿命。
3. **不剧透结局**：禁透露角色死亡、自杀、流放等原著关键转折。
4. **人名锁定**：`makar-devushkin` 展示名「杰武什金」≠ `makar`「马卡尔」；不出现丽莎。

## 调性
娱乐向、有钩子；保留「人格」品牌词；不堆诊断句；与已订正 epithet/tagline/summary 不矛盾；紧贴陀氏原文思想，不白话化改写。

## 输出
逐角色列：字段 → 原文 → 问题 → 建议改写（最小 diff）→ P0/P1。无问题输出「OK」。
~~~~
