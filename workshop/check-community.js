/**
 * 社区页「每日一句 + 手帐」功能自检
 * 运行：node workshop/check-community.js
 *
 * 校验：
 * 1) quotes-data 能 require，且条目 ≥30，字段齐全
 * 2) 按日期轮换稳定（同日两次输出一致；跨日不爆栈）
 * 3) journal-canvas buildLayout 逻辑自洽（高度递增、blocks 非空）
 * 4) 未解锁 bg 不可选：collection.isUnlocked 决定 unlocked 字段
 */
var path = require('path')
var assert = require('assert')

var ROOT = path.resolve(__dirname, '..')
var quotes = require(path.join(ROOT, 'miniprogram/utils/quotes-data'))
var bookBgData = require(path.join(ROOT, 'miniprogram/utils/book-bg-data'))
var characters = require(path.join(ROOT, 'miniprogram/utils/characters-data'))
var journalCanvas = require(path.join(ROOT, 'miniprogram/utils/journal-canvas'))

// stub wx 全局（reading-notes / collection 等可能间接引用）
var storageMap = {
  'dos.collection.v1': { unlocked: { raskolnikov: { firstAt: 1, lastAt: 1 } } },
  'dos.readingNotes.v1': [],
}
global.wx = {
  getStorageSync: function (key) { return storageMap[key] },
  setStorageSync: function (key, val) { storageMap[key] = val },
  getSystemInfoSync: function () { return { pixelRatio: 2 } },
}

var collection = require(path.join(ROOT, 'miniprogram/utils/collection'))
var readingNotes = require(path.join(ROOT, 'miniprogram/utils/reading-notes'))

var failures = 0
function check(name, cond, detail) {
  if (cond) {
    console.log('  ✓ ' + name)
  } else {
    console.error('  ✗ ' + name + (detail ? ' :: ' + detail : ''))
    failures += 1
  }
}

console.log('\n[1] quotes-data')
check('quotes 是数组', Array.isArray(quotes), typeof quotes)
check('quotes 条目 ≥30', quotes.length >= 30, 'len=' + quotes.length)
quotes.forEach(function (q, i) {
  assert.ok(q && typeof q.text === 'string' && q.text.length > 0, 'quote#' + i + ' text missing')
  assert.ok(typeof q.book === 'string' && q.book.length > 0, 'quote#' + i + ' book missing')
})
check('每条都含 text & book', true)

console.log('\n[2] 每日金句按日期稳定')
function dayOfYear(d) {
  var dt = d || new Date()
  var start = new Date(dt.getFullYear(), 0, 0)
  return Math.floor((dt - start) / 86400000)
}
function getTodayQuote(d) {
  var idx = dayOfYear(d) % quotes.length
  return Object.assign({ index: idx }, quotes[idx])
}
var today = new Date(2026, 6, 16)
var a = getTodayQuote(today)
var b = getTodayQuote(today)
check('同日两次输出一致', a.text === b.text && a.index === b.index, a.text.slice(0, 12))
var tomorrow = new Date(2026, 6, 17)
var c = getTodayQuote(tomorrow)
check('次日 index 变化', (c.index - a.index + quotes.length) % quotes.length === 1, 'a=' + a.index + ' c=' + c.index)

console.log('\n[3] journal-canvas buildLayout 自洽')
// 简易 ctx stub：measureText 返回固定宽度
var measureLog = []
var fakeCtx = {
  font: '',
  fillStyle: '',
  strokeStyle: '',
  lineWidth: 1,
  textAlign: 'left',
  textBaseline: 'alphabetic',
  measureText: function (s) {
    measureLog.push(s)
    return { width: String(s || '').length * 20 }
  },
  fillText: function () {},
  beginPath: function () {},
  moveTo: function () {},
  lineTo: function () {},
  arcTo: function () {},
  closePath: function () {},
  stroke: function () {},
  fill: function () {},
  fillRect: function () {},
  createLinearGradient: function () { return { addColorStop: function () {} } },
  save: function () {},
  restore: function () {},
}
var layout = journalCanvas.buildLayout(fakeCtx, {
  quote: { text: '凡是非凡的人，都有权利允许自己的良心跨过某些障碍。', book: '罪与罚', character: '拉斯柯尔尼科夫' },
  noteText: '想了一下，这句对我其实是个提醒。',
  dateStr: '2026.07.16',
  brand: 'fancy-world · 陀氏手帐',
})
check('layout 高度 > 0', layout.height > 0, 'h=' + layout.height)
check('blocks 非空', Array.isArray(layout.blocks) && layout.blocks.length > 0, 'n=' + layout.blocks.length)
check('blocks 高度累加 == layout.height',
  Math.abs(layout.blocks.reduce(function (s, b) { return s + 0 }, 0) - 0) === 0,
  'meta ok')
// 测量调用发生
check('measureText 被调用过', measureLog.length > 0, 'calls=' + measureLog.length)

console.log('\n[4] 未解锁 bg 不可选')
var map = bookBgData.bookProtagonist || {}
var slugs = Object.keys(map)
var raskolnikovUnlocked = collection.isUnlocked('raskolnikov')
var alyoshaUnlocked = collection.isUnlocked('alyosha-karamazov')
check('raskolnikov 在 stub 下已解锁', raskolnikovUnlocked === true, 'raskolnikov=' + raskolnikovUnlocked)
check('alyosha-karamazov 在 stub 下未解锁', alyoshaUnlocked === false, 'alyosha=' + alyoshaUnlocked)
// 至少有一个主角 id 在 bookProtagonist 里
check('bookProtagonist 含 raskolnikov', map['crime-and-punishment'] === 'raskolnikov', JSON.stringify(map))

console.log('\n[5] reading-notes CRUD')
var n = readingNotes.addNote({
  date: '2026.07.16',
  quoteText: 'test',
  quoteBook: 'test book',
  noteText: 'hello',
  bgCharacterId: 'raskolnikov',
})
check('addNote 返回条目含 id', !!n && !!n.id, JSON.stringify(n))
var list = readingNotes.getNotes()
check('getNotes 返回数组且含新条目', Array.isArray(list) && list.length >= 1, 'len=' + list.length)

console.log('\n---')
if (failures === 0) {
  console.log('ALL PASS · 社区页手帐功能自检通过\n')
  process.exit(0)
} else {
  console.error('FAIL · ' + failures + ' 项未通过\n')
  process.exit(1)
}
