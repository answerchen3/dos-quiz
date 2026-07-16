#!/usr/bin/env node
/**
 * 计分分布 Monte Carlo 门禁（P0-5 伴随）
 * 用法：node workshop/scripts/monte-carlo-scoring.js [N=5000]
 *
 * 门槛：
 * - 主人格覆盖 ≥18/36
 * - 任一角色占比 ≤25%
 * - 索尼娅 / 梅什金 / 地下室人 各自 ≥1%
 */
const fs = require('fs')
const path = require('path')
const root = path.join(__dirname, '../..')
const questions = require(path.join(root, 'miniprogram/utils/questions-data.js'))
const characters = require(path.join(root, 'miniprogram/utils/characters-data.js'))
const {
  computeAxisScores,
  normalizeAxes,
  rankCharactersByAxes,
  pickPrimaryAndShadow,
} = require(path.join(root, 'miniprogram/utils/quiz.js'))

const N = Math.max(1000, parseInt(process.argv[2] || '5000', 10) || 5000)
const counts = {}
characters.forEach(function (c) {
  counts[c.id] = 0
})

for (let t = 0; t < N; t += 1) {
  const answers = questions.map(function (q) {
    const n = (q.options && q.options.length) || 0
    return n ? Math.floor(Math.random() * n) : 0
  })
  const raw = computeAxisScores(questions, answers)
  const userAxes = normalizeAxes(raw)
  const ranked = rankCharactersByAxes(characters, userAxes)
  const primary = pickPrimaryAndShadow(ranked).primary
  counts[primary.id] += 1
}

const entries = Object.keys(counts)
  .map(function (id) {
    return { id: id, count: counts[id], pct: counts[id] / N }
  })
  .sort(function (a, b) {
    return b.count - a.count
  })

const covered = entries.filter(function (e) {
  return e.count > 0
}).length
const top = entries[0]
const named = {
  sonya: counts.sonya || 0,
  'prince-myshkin': counts['prince-myshkin'] || 0,
  'underground-man': counts['underground-man'] || 0,
}

const gates = {
  coverage: covered >= 18,
  topShare: top.pct <= 0.25,
  sonya: named.sonya / N >= 0.01,
  myshkin: named['prince-myshkin'] / N >= 0.01,
  underground: named['underground-man'] / N >= 0.01,
}
const pass = Object.keys(gates).every(function (k) {
  return gates[k]
})

function pct(n) {
  return ((n / N) * 100).toFixed(2) + '%'
}

function nameOf(id) {
  const c = characters.find(function (x) {
    return x.id === id
  })
  return c ? c.name : id
}

const lines = []
lines.push('# Monte Carlo 计分分布摘要')
lines.push('')
lines.push('- 生成时间：' + new Date().toISOString())
lines.push('- 样本数 N=' + N)
lines.push('- 归一化：`AXIS_NORM_BOUNDS` 按轴 p01–p99 标定（见 `miniprogram/utils/quiz.js`）')
lines.push('- 覆盖：' + covered + ' / 36')
lines.push(
  '- Top1：' +
    nameOf(top.id) +
    ' ' +
    pct(top.count) +
    '（门槛 ≤25%：' +
    (gates.topShare ? '过' : '未过') +
    '）',
)
lines.push(
  '- 索尼娅：' +
    pct(named.sonya) +
    '｜梅什金：' +
    pct(named['prince-myshkin']) +
    '｜地下室人：' +
    pct(named['underground-man']),
)
lines.push('- 门禁：' + (pass ? '**PASS**' : '**FAIL**'))
lines.push('')
lines.push('## 门槛逐项')
lines.push('')
lines.push('| 项 | 结果 | 是否过 |')
lines.push('|----|------|--------|')
lines.push(
  '| 覆盖 ≥18/36 | ' + covered + '/36 | ' + (gates.coverage ? '✓' : '✗') + ' |',
)
lines.push(
  '| Top ≤25% | ' +
    pct(top.count) +
    ' | ' +
    (gates.topShare ? '✓' : '✗') +
    ' |',
)
lines.push('| 索尼娅 ≥1% | ' + pct(named.sonya) + ' | ' + (gates.sonya ? '✓' : '✗') + ' |')
lines.push(
  '| 梅什金 ≥1% | ' +
    pct(named['prince-myshkin']) +
    ' | ' +
    (gates.myshkin ? '✓' : '✗') +
    ' |',
)
lines.push(
  '| 地下室人 ≥1% | ' +
    pct(named['underground-man']) +
    ' | ' +
    (gates.underground ? '✓' : '✗') +
    ' |',
)
lines.push('')
lines.push('## Top 15')
lines.push('')
entries.slice(0, 15).forEach(function (e, i) {
  lines.push((i + 1) + '. ' + nameOf(e.id) + ' — ' + pct(e.count))
})
lines.push('')

const outPath = path.join(root, 'workshop/docs/monte-carlo-scoring-summary.md')
fs.writeFileSync(outPath, lines.join('\n'), 'utf8')

console.log(lines.join('\n'))
console.log('\n已写入 ' + outPath)
process.exit(pass ? 0 : 1)
