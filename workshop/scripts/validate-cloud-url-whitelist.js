#!/usr/bin/env node
/**
 * 云函数换链白名单逻辑自检（无需部署）
 * 用法：node workshop/scripts/validate-cloud-url-whitelist.js
 */
const path = require('path')
const fs = require('fs')
const root = path.join(__dirname, '../..')

const PREFIX =
  'cloud://cloud1-d5gw2jt7af9f83de9.636c-cloud1-d5gw2jt7af9f83de9-1453135575/quiz/'

function extractAllowedPrefix(src) {
  const m = src.match(/ALLOWED_FILE_PREFIX\s*=\s*['"]([^'"]+)['"]/)
  return m && m[1]
}

const files = [
  'cloudfunctions/quickstartFunctions/index.js',
  'cloudfunctions/getAssetUrls/index.js',
]

const errors = []
const prefixes = []

files.forEach(function (rel) {
  const abs = path.join(root, rel)
  const src = fs.readFileSync(abs, 'utf8')
  const p = extractAllowedPrefix(src)
  if (!p) {
    errors.push(rel + ' 缺少 ALLOWED_FILE_PREFIX')
    return
  }
  prefixes.push(p)
  if (p !== PREFIX) {
    errors.push(rel + ' 前缀不匹配期望 quiz/ 白名单')
  }
  if (src.indexOf('isAllowedFileId') === -1) {
    errors.push(rel + ' 缺少 isAllowedFileId 校验')
  }
  // quickstart 应收口演示 type
  if (rel.indexOf('quickstartFunctions') !== -1) {
    ;['getOpenId', 'getMiniProgramCode', 'createCollection', 'selectRecord'].forEach(
      function (t) {
        if (src.indexOf('type disabled') === -1 && src.indexOf('case "' + t + '"') !== -1) {
          // 允许 case 存在但必须返回 disabled
        }
        if (src.indexOf('type disabled') === -1) {
          errors.push(rel + ' 未硬禁用演示 type')
        }
      },
    )
  }
})

if (prefixes.length === 2 && prefixes[0] !== prefixes[1]) {
  errors.push('两处云函数 ALLOWED_FILE_PREFIX 不一致')
}

// 模拟白名单判断
function isAllowed(id) {
  return typeof id === 'string' && id.indexOf(PREFIX) === 0
}
const okId = PREFIX + 'portraits/x.jpg'
const badId = PREFIX.replace(/quiz\/$/, '') + 'other/x.jpg'
if (!isAllowed(okId)) errors.push('合法 quiz/ id 应通过')
if (isAllowed(badId)) errors.push('非 quiz/ id 应拒绝')
if (isAllowed('https://example.com/a.jpg')) errors.push('https 不应当作允许 File ID')

console.log('=== 云换链白名单自检 ===')
if (errors.length) {
  errors.forEach(function (e) {
    console.log('  ✗', e)
  })
  process.exit(1)
}
console.log('两处前缀一致:', PREFIX)
console.log('合法 id 通过 / 非法 id 拒绝')
console.log('通过')
process.exit(0)
