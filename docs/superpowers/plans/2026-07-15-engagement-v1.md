# Engagement v1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 落地吸引力增强 v1：持久图鉴 + 结果揭幕 + 本场遇见 + 分享图补暗影/nextStep。

**Architecture:** 新增 `collection.js` 统一本地存储；测验页会话记录闪卡 id，结果时落盘；结果/开场用 overlay 展示图鉴；分享图在 analysis 与 shadow 之间插入 nextStep。

**Tech Stack:** 微信小程序（WXML/WXSS/JS）、`wx.setStorageSync`

## Global Constraints

- 不改计分与角色库文案；仅固定壳文案
- 存储 key：`dos.collection.v1`；页面不直接碰 storage
- 云同步只预留 `exportForSync` / `importFromSync`

## File Map

| 文件 | 职责 |
| --- | --- |
| `miniprogram/utils/collection.js` | 读写/解锁/图鉴 VM/同步预留 |
| `miniprogram/pages/quiz/quiz.js` | 会话遇见、落盘、图鉴/结果数据 |
| `miniprogram/pages/quiz/quiz.wxml` | 开场进度、nextStep、本场遇见、图鉴 overlay |
| `miniprogram/pages/quiz/quiz.wxss` | 揭幕/图鉴样式 |
| `miniprogram/utils/share.js` | 长图加 nextStep + 暗影壳文案 |

## Tasks

- [x] Task 1: `collection.js`
- [x] Task 2: 测验页接线（会话 + 落盘 + 图鉴）
- [x] Task 3: WXML/WXSS UI
- [x] Task 4: 分享图增强
- [x] Task 5: 手动验收清单对照 design §7（本地 collection 单测通过；真机请在开发者工具过一遍）
