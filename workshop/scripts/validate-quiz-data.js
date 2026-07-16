#!/usr/bin/env node
/**
 * 题库字段自检（P0-5 伴随）
 * 用法：node workshop/scripts/validate-quiz-data.js
 */
const path = require('path')
const root = path.join(__dirname, '../..')
const questions = require(path.join(root, 'miniprogram/utils/questions-data.js'))
const characters = require(path.join(root, 'miniprogram/utils/characters-data.js'))
const { AXIS_ORDER } = require(path.join(root, 'miniprogram/utils/quiz.js'))

const errors = []
const warnings = []

function fail(msg) {
  errors.push(msg)
}

function warn(msg) {
  warnings.push(msg)
}

if (!Array.isArray(questions) || questions.length !== 20) {
  fail('题目数量应为 20，实际 ' + (questions && questions.length))
}

const charById = {}
;(characters || []).forEach(function (c) {
  if (!c || !c.id) {
    fail('角色缺少 id')
    return
  }
  if (charById[c.id]) fail('重复角色 id: ' + c.id)
  charById[c.id] = c
})

if (Object.keys(charById).length !== 36) {
  fail('角色数量应为 36，实际 ' + Object.keys(charById).length)
}

;(characters || []).forEach(function (c) {
  ;['name', 'bookTitle', 'tagline', 'summary', 'epithet'].forEach(function (k) {
    if (!c[k]) warn(c.id + ' 缺少字段 ' + k)
  })
  if (!c.axes || typeof c.axes !== 'object') {
    fail(c.id + ' 缺少 axes')
    return
  }
  AXIS_ORDER.forEach(function (axis) {
    if (typeof c.axes[axis] !== 'number') {
      fail(c.id + ' axes.' + axis + ' 非数字')
    }
  })
})

const dirty = ['精神病院', '精神病', '像一种病', '请就医']
const dirtyHits = []
;(characters || []).forEach(function (c) {
  const blob = [
    c.epithet,
    c.summary,
    c.traitAnalysis,
    c.strengths,
    c.blindSpot,
    c.inRelation,
    c.growth,
    c.tagline,
  ]
    .filter(Boolean)
    .join('\n')
  dirty.forEach(function (word) {
    if (blob.indexOf(word) !== -1) {
      dirtyHits.push(c.id + ' 含「' + word + '」')
    }
  })
  // 病理义「幻觉」仅拦角色文案（题干文学用法不在此扫）
  if (/幻觉/.test(blob) && /焦虑|分裂|外化|病理/.test(blob)) {
    dirtyHits.push(c.id + ' 疑似病理「幻觉」措辞')
  }
})
dirtyHits.forEach(function (h) {
  fail(h)
})

questions.forEach(function (q, qi) {
  const qid = q.id || 'Q' + (qi + 1)
  if (!q.scene && !q.quote) fail(qid + ' 缺少 scene/quote')
  if (!Array.isArray(q.options) || q.options.length < 2) {
    fail(qid + ' options 不足')
    return
  }
  q.options.forEach(function (opt, oi) {
    if (!opt || !opt.text) fail(qid + ' option' + oi + ' 无 text')
    if (!opt.axes || typeof opt.axes !== 'object') {
      fail(qid + ' option' + oi + ' 无 axes')
      return
    }
    AXIS_ORDER.forEach(function (axis) {
      const v = opt.axes[axis]
      if (v == null) return
      if (typeof v !== 'number' || Number.isNaN(v)) {
        fail(qid + ' option' + oi + ' axes.' + axis + ' 非法')
      }
    })
    if (opt.characterId && !charById[opt.characterId]) {
      fail(qid + ' option' + oi + ' characterId 不存在: ' + opt.characterId)
    }
    if (opt.flash && opt.flash.characterId && !charById[opt.flash.characterId]) {
      fail(qid + ' flash.characterId 不存在: ' + opt.flash.characterId)
    }
  })
})

console.log('=== 题库字段自检 ===')
console.log('题目:', questions.length, '角色:', Object.keys(charById).length)
if (warnings.length) {
  console.log('警告 (' + warnings.length + '):')
  warnings.slice(0, 20).forEach(function (w) {
    console.log('  -', w)
  })
}
if (errors.length) {
  console.log('失败 (' + errors.length + '):')
  errors.forEach(function (e) {
    console.log('  ✗', e)
  })
  process.exit(1)
}
console.log('通过')
process.exit(0)
