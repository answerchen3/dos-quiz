/**
 * 陀翁手帐 canvas 合成
 *
 * 参考 utils/share.js 的离屏 canvas 生成思路：
 *   bg 底图铺满 → 暗色半透明蒙层 → 金句（大字宋体）→ 用户感受 → 日期 + 小程序名
 *
 * 走 utils/cloud-url.toDisplayUrl 换链，不客户端直调云存储。
 */
var { toDisplayUrl } = require('./cloud-url')

var W = 750
var PAD = 56
var CONTENT_W = W - PAD * 2
var MAX_PIXEL = 4096

var COLOR_GOLD = '#d4b483'
var COLOR_GOLD_SOFT = '#a89478'
var COLOR_CREAM = '#f3e6d0'
var COLOR_CREAM_DIM = 'rgba(246,234,212,0.88)'

function wrapLines(ctx, text, maxWidth) {
  var raw = String(text || '')
  if (!raw) return []
  var chars = Array.from(raw)
  var lines = []
  var line = ''
  for (var i = 0; i < chars.length; i += 1) {
    var ch = chars[i]
    if (ch === '\n') {
      lines.push(line)
      line = ''
      continue
    }
    var test = line + ch
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line)
      line = ch
    } else {
      line = test
    }
  }
  if (line) lines.push(line)
  return lines
}

function measureWrapped(ctx, text, maxWidth, lineHeight) {
  return wrapLines(ctx, text, maxWidth).length * lineHeight
}

function drawWrapped(ctx, text, x, y, maxWidth, lineHeight) {
  var lines = wrapLines(ctx, text, maxWidth)
  lines.forEach(function (line, i) {
    ctx.fillText(line, x, y + i * lineHeight)
  })
  return lines.length * lineHeight
}

function roundRectPath(ctx, x, y, w, h, r) {
  var radius = Math.min(r, w / 2, h / 2)
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.arcTo(x + w, y, x + w, y + h, radius)
  ctx.arcTo(x + w, y + h, x, y + h, radius)
  ctx.arcTo(x, y + h, x, y, radius)
  ctx.arcTo(x, y, x + w, y, radius)
  ctx.closePath()
}

function resolveDrawableUrl(src) {
  if (!src) return Promise.resolve(src)
  return toDisplayUrl(src)
}

function loadImage(canvas, src) {
  return resolveDrawableUrl(src).then(function (url) {
    if (!url) return null
    return new Promise(function (resolve, reject) {
      var img = canvas.createImage()
      img.onload = function () { resolve(img) }
      img.onerror = function (err) { reject(err) }
      img.src = url
    })
  })
}

function pickScale(logicalH) {
  var sys = Math.min(2, (typeof wx !== 'undefined' && wx.getSystemInfoSync && wx.getSystemInfoSync().pixelRatio) || 2)
  var maxByHeight = MAX_PIXEL / Math.max(logicalH, 1)
  var maxByWidth = MAX_PIXEL / W
  return Math.max(0.5, Math.min(sys, maxByHeight, maxByWidth))
}

function pad2(n) {
  return n < 10 ? '0' + n : String(n)
}

function todayStr(d) {
  var dt = d || (typeof Date !== 'undefined' ? new Date() : null)
  if (!dt) return ''
  return dt.getFullYear() + '.' + pad2(dt.getMonth() + 1) + '.' + pad2(dt.getDate())
}

/**
 * 测量阶段：返回总高度与绘制块列表
 */
function buildLayout(ctx, options) {
  var noteText = options.noteText || ''
  var dateStr = options.dateStr || ''
  var brand = options.brand || 'fancy-world · 陀氏手帐'
  var y = 0
  var blocks = []

  function push(fn, h) {
    blocks.push({ y: y, draw: fn })
    y += h
  }

  // 顶部留白 + eyebrow
  push(function (c, top, bg) {
    c.fillStyle = COLOR_GOLD
    c.font = "22px 'Songti SC', 'STSong', serif"
    c.fillText('陀氏手帐', PAD, top + 70)
  }, 96)

  // 感受正文（大字宋体，作为手帐主内容）
  var bodyText = noteText || '（还没写下感受）'
  ctx.font = "bold 38px 'Songti SC', 'STSong', serif"
  var noteH = measureWrapped(ctx, bodyText, CONTENT_W, 58)
  push(function (c, top) {
    c.fillStyle = noteText ? COLOR_CREAM : 'rgba(168,148,120,0.6)'
    c.font = "bold 38px 'Songti SC', 'STSong', serif"
    drawWrapped(c, bodyText, PAD, top + 40, CONTENT_W, 58)
  }, Math.max(noteH + 56, 120))

  // 金色分隔线
  push(function (c, top) {
    c.strokeStyle = 'rgba(212,180,131,0.45)'
    c.lineWidth = 1
    c.beginPath()
    c.moveTo(PAD, top + 8)
    c.lineTo(W - PAD, top + 8)
    c.stroke()
    // 中点小菱形
    c.fillStyle = COLOR_GOLD
    c.font = "18px 'Songti SC', serif"
    c.textAlign = 'center'
    c.textBaseline = 'middle'
    c.fillText('◆', W / 2, top + 8)
    c.textAlign = 'left'
    c.textBaseline = 'alphabetic'
  }, 40)

  // 底部 footer：日期 + 小程序名
  push(function (c, top) {
    c.fillStyle = 'rgba(212,180,131,0.85)'
    c.font = "20px 'Songti SC', serif"
    c.fillText(dateStr, PAD, top + 24)
    var brandStr = brand
    c.fillStyle = 'rgba(168,148,120,0.85)'
    c.font = "20px 'PingFang SC', sans-serif"
    c.textAlign = 'right'
    c.fillText(brandStr, W - PAD, top + 24)
    c.textAlign = 'left'
  }, 80)

  // 底部留白
  push(function () {}, 64)

  return { height: y, blocks: blocks }
}

/**
 * 绘制 bg 底图（cover 模式）+ 暗色蒙层
 */
function drawBackground(ctx, bg, w, h) {
  if (bg) {
    var zoom = 1.05
    var scale = Math.max(w / bg.width, h / bg.height) * zoom
    var drawW = bg.width * scale
    var drawH = bg.height * scale
    var dx = (w - drawW) / 2
    var dy = (h - drawH) / 2
    ctx.drawImage(bg, dx, dy, drawW, drawH)
  } else {
    // 无 bg 兜底：深褐渐变
    var g = ctx.createLinearGradient(0, 0, w, h)
    g.addColorStop(0, '#1c120f')
    g.addColorStop(0.5, '#0c0907')
    g.addColorStop(1, '#16110d')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, w, h)
  }

  // 整体半透明暗色蒙层，让文字可读
  ctx.fillStyle = 'rgba(12,9,7,0.62)'
  ctx.fillRect(0, 0, w, h)

  // 顶部更暗一点，呼应 eyebrow；底部渐深呼应 footer
  var topG = ctx.createLinearGradient(0, 0, 0, 220)
  topG.addColorStop(0, 'rgba(0,0,0,0.45)')
  topG.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = topG
  ctx.fillRect(0, 0, w, 220)

  var botG = ctx.createLinearGradient(0, h - 220, 0, h)
  botG.addColorStop(0, 'rgba(0,0,0,0)')
  botG.addColorStop(1, 'rgba(0,0,0,0.55)')
  ctx.fillStyle = botG
  ctx.fillRect(0, h - 220, w, 220)

  // 金色边框
  ctx.strokeStyle = 'rgba(212,180,131,0.28)'
  ctx.lineWidth = 1.5
  roundRectPath(ctx, 18, 18, w - 36, h - 36, 24)
  ctx.stroke()
}

/**
 * 导出手帐图片（临时文件路径）。
 *
 * options:
 *   canvas        type=2d canvas 节点
 *   bgSrc         bg 图地址（cloud:// 或 https）；可空
 *   quote         { text, book, character? }
 *   noteText      用户感受
 *   dateStr       显示日期字符串；缺省自动今天
 *   brand         底部品牌名
 *
 * resolve(tempFilePath)
 */
function exportJournalImage(options) {
  var canvas = options.canvas
  if (!canvas) return Promise.reject(new Error('canvas missing'))
  var noteText = options.noteText || ''
  var dateStr = options.dateStr || todayStr()
  var brand = options.brand || 'fancy-world · 陀氏手帐'

  var measureCtx = canvas.getContext('2d')
  if (!measureCtx) return Promise.reject(new Error('canvas context unavailable'))

  // 临时小尺寸用于测量
  canvas.width = W
  canvas.height = 100
  var layout = buildLayout(measureCtx, {
    noteText: noteText,
    dateStr: dateStr,
    brand: brand,
  })
  var H = Math.ceil(layout.height)
  // 最小高度，保证视觉留白
  if (H < 720) H = 720
  var scale = pickScale(H)

  canvas.width = Math.floor(W * scale)
  canvas.height = Math.floor(H * scale)
  var ctx = canvas.getContext('2d')
  ctx.scale(scale, scale)

  return loadImage(canvas, options.bgSrc || '')
    .catch(function () { return null })
    .then(function (bg) {
      drawBackground(ctx, bg, W, H)
      layout.blocks.forEach(function (block) {
        block.draw(ctx, block.y, bg)
      })
      return new Promise(function (resolve, reject) {
        wx.canvasToTempFilePath(
          {
            canvas: canvas,
            fileType: 'png',
            quality: 1,
            success: function (res) { resolve(res.tempFilePath) },
            fail: reject,
          },
          options.component,
        )
      })
    })
}

module.exports = {
  W: W,
  PAD: PAD,
  exportJournalImage: exportJournalImage,
  buildLayout: buildLayout,
  todayStr: todayStr,
}
