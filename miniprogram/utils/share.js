const { characterImage, PLACEHOLDER_IMAGE, AXIS_ORDER } = require('./quiz')
const { buildRadarGeometry } = require('./radar')

const W = 750
const PAD = 40
const CONTENT_W = W - PAD * 2
const MAX_PIXEL = 4096

function wrapLines(ctx, text, maxWidth) {
  const raw = String(text || '')
  if (!raw) return []
  const chars = Array.from(raw)
  const lines = []
  let line = ''
  for (let i = 0; i < chars.length; i += 1) {
    const ch = chars[i]
    if (ch === '\n') {
      lines.push(line)
      line = ''
      continue
    }
    const test = line + ch
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

function drawWrapped(ctx, text, x, y, maxWidth, lineHeight) {
  const lines = wrapLines(ctx, text, maxWidth)
  lines.forEach(function (line, i) {
    ctx.fillText(line, x, y + i * lineHeight)
  })
  return lines.length * lineHeight
}

function measureWrapped(ctx, text, maxWidth, lineHeight) {
  return wrapLines(ctx, text, maxWidth).length * lineHeight
}

function roundRectPath(ctx, x, y, w, h, r) {
  const radius = Math.min(r, w / 2, h / 2)
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
  if (src.indexOf('cloud://') !== 0) return Promise.resolve(src)
  if (!wx.cloud || !wx.cloud.getTempFileURL) {
    return Promise.reject(new Error('云能力不可用'))
  }
  return wx.cloud.getTempFileURL({ fileList: [src] }).then(function (res) {
    var file = res.fileList && res.fileList[0]
    if (!file || !file.tempFileURL) {
      throw new Error('获取云文件临时链接失败')
    }
    return file.tempFileURL
  })
}

function loadImage(canvas, src) {
  return resolveDrawableUrl(src).then(function (url) {
    return new Promise(function (resolve, reject) {
      const img = canvas.createImage()
      img.onload = function () { resolve(img) }
      img.onerror = function (err) { reject(err) }
      img.src = url
    })
  })
}

function ensureAlbumAuth() {
  return wx.getSetting().then((setting) => {
    if (setting.authSetting['scope.writePhotosAlbum']) return true
    return wx.authorize({ scope: 'scope.writePhotosAlbum' }).then(() => true).catch(() => {
      return wx.showModal({
        title: '需要相册权限',
        content: '请在设置中开启「保存到相册」，以便保存分享图。',
        confirmText: '去设置',
      }).then((modal) => {
        if (!modal.confirm) return false
        return wx.openSetting().then(() => wx.getSetting()).then((again) => {
          return !!again.authSetting['scope.writePhotosAlbum']
        })
      })
    })
  })
}

function pickScale(logicalH) {
  var sys = Math.min(2, wx.getSystemInfoSync().pixelRatio || 2)
  var maxByHeight = MAX_PIXEL / Math.max(logicalH, 1)
  var maxByWidth = MAX_PIXEL / W
  return Math.max(0.5, Math.min(sys, maxByHeight, maxByWidth))
}

function drawRadar(ctx, axes, x, y, size) {
  var g = buildRadarGeometry(axes || {}, size, size * 0.34)
  ctx.save()
  ctx.translate(x, y)

  g.gridPolygons.forEach(function (pts) {
    var pairs = pts.split(' ').map(function (p) {
      return p.split(',').map(Number)
    })
    ctx.beginPath()
    pairs.forEach(function (xy, i) {
      if (i === 0) ctx.moveTo(xy[0], xy[1])
      else ctx.lineTo(xy[0], xy[1])
    })
    ctx.closePath()
    ctx.strokeStyle = 'rgba(212,180,131,0.18)'
    ctx.lineWidth = 1
    ctx.stroke()
  })

  g.axisLines.forEach(function (l) {
    ctx.beginPath()
    ctx.moveTo(g.cx, g.cy)
    ctx.lineTo(l.x2, l.y2)
    ctx.strokeStyle = 'rgba(212,180,131,0.22)'
    ctx.lineWidth = 1
    ctx.stroke()
  })

  g.labels.forEach(function (l) {
    ctx.fillStyle = '#d4b483'
    ctx.font = "18px 'PingFang SC', sans-serif"
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(l.name, l.x, l.y)
  })
  ctx.textAlign = 'left'
  ctx.textBaseline = 'alphabetic'

  var area = g.areaPoints.split(' ').map(function (p) {
    return p.split(',').map(Number)
  })
  ctx.beginPath()
  area.forEach(function (xy, i) {
    if (i === 0) ctx.moveTo(xy[0], xy[1])
    else ctx.lineTo(xy[0], xy[1])
  })
  ctx.closePath()
  ctx.fillStyle = 'rgba(226,197,146,0.28)'
  ctx.fill()
  ctx.strokeStyle = '#d4b483'
  ctx.lineWidth = 1.5
  ctx.stroke()

  g.dots.forEach(function (d) {
    ctx.beginPath()
    ctx.arc(d.x, d.y, 3.5, 0, Math.PI * 2)
    ctx.fillStyle = '#e2c592'
    ctx.fill()
  })

  ctx.restore()
}

function buildLayout(ctx, options) {
  var primary = options.primary
  var shadow = options.shadow
  var axisLegend = options.axisLegend || []
  var y = PAD
  var blocks = []

  function push(fn, h) {
    blocks.push({ y: y, draw: fn })
    y += h
  }

  // brand
  push(function (c, top) {
    c.fillStyle = '#d4b483'
    c.font = "20px 'Songti SC', 'PingFang SC', serif"
    c.fillText(
      primary.hidden ? 'HIDDEN · 测测你的陀氏人格' : 'DOSTOEVSKY · 测测你的陀氏人格',
      PAD,
      top + 20,
    )
  }, 36)

  // eyebrow
  push(function (c, top) {
    c.fillStyle = '#f3e6d0'
    c.font = "bold 36px 'Songti SC', 'STSong', serif"
    c.fillText(primary.hidden ? '你解锁了隐藏角色' : '你的陀氏人格是', PAD, top + 32)
  }, 52)

  // epithet
  if (primary.epithet) {
    ctx.font = "bold 42px 'Songti SC', 'STSong', serif"
    var epithetH = measureWrapped(ctx, primary.epithet, CONTENT_W, 50)
    push(function (c, top) {
      c.fillStyle = '#d4b483'
      c.font = "bold 42px 'Songti SC', 'STSong', serif"
      drawWrapped(c, primary.epithet, PAD, top + 36, CONTENT_W, 50)
    }, epithetH + 16)
  }

  // hero: portrait + copy
  var portraitH = 280
  var portraitW = 220
  var copyX = PAD + portraitW + 24
  var copyW = W - copyX - PAD
  ctx.font = "bold 32px 'Songti SC', 'STSong', serif"
  var nameH = measureWrapped(ctx, primary.name, copyW, 40)
  ctx.font = "22px 'PingFang SC', sans-serif"
  var bookH = 30
  ctx.font = "22px 'PingFang SC', sans-serif"
  var taglineH = measureWrapped(ctx, primary.tagline, copyW, 32)
  var tags = []
  ;(primary.tags || []).forEach(function (t) { tags.push(t) })
  ;(primary.traits || []).forEach(function (t) { tags.push(t) })
  tags = tags.slice(0, 6)
  var tagsH = tags.length ? 56 : 0
  var copyH = 8 + nameH + bookH + 8 + taglineH + 12 + tagsH
  var heroH = Math.max(portraitH, copyH)

  push(function (c, top, portrait) {
    var frameX = PAD
    var frameY = top
    roundRectPath(c, frameX, frameY, portraitW, portraitH, 20)
    c.save()
    c.clip()
    if (portrait) {
      var zoom = 1.22
      var scale = Math.max(portraitW / portrait.width, portraitH / portrait.height) * zoom
      var drawW = portrait.width * scale
      var drawH = portrait.height * scale
      var dx = frameX + (portraitW - drawW) / 2
      var dy = frameY + (portraitH - drawH) / 2 - portraitH * 0.05
      c.drawImage(portrait, dx, dy, drawW, drawH)
    } else {
      c.fillStyle = '#241612'
      c.fillRect(frameX, frameY, portraitW, portraitH)
    }
    c.restore()
    c.strokeStyle = 'rgba(196,165,116,0.45)'
    c.lineWidth = 2
    roundRectPath(c, frameX, frameY, portraitW, portraitH, 20)
    c.stroke()

    var ty = top + 28
    c.fillStyle = '#f3e6d0'
    c.font = "bold 32px 'Songti SC', 'STSong', serif"
    ty += drawWrapped(c, primary.name, copyX, ty, copyW, 40)

    c.fillStyle = '#d4b483'
    c.font = "22px 'PingFang SC', sans-serif"
    c.fillText('《' + primary.bookTitle + '》', copyX, ty + 8)
    ty += bookH

    c.fillStyle = '#a89478'
    c.font = "22px 'PingFang SC', sans-serif"
    ty += drawWrapped(c, primary.tagline, copyX, ty + 8, copyW, 32) + 12

    if (tags.length) {
      var tx = copyX
      var ty2 = ty
      tags.forEach(function (tag) {
        c.font = "18px 'PingFang SC', sans-serif"
        var label = tag
        var tw = c.measureText(label).width + 20
        if (tx + tw > W - PAD) {
          tx = copyX
          ty2 += 34
        }
        roundRectPath(c, tx, ty2 - 16, tw, 28, 14)
        c.fillStyle = 'rgba(212,180,131,0.12)'
        c.fill()
        c.strokeStyle = 'rgba(212,180,131,0.35)'
        c.lineWidth = 1
        c.stroke()
        c.fillStyle = '#d4b483'
        c.fillText(label, tx + 10, ty2)
        tx += tw + 8
      })
    }
  }, heroH + 28)

  // trait panel
  var panelPad = 24
  var radarSize = 300
  ctx.font = "bold 26px 'Songti SC', 'STSong', serif"
  var traitTitleH = 34
  ctx.font = "20px 'PingFang SC', sans-serif"
  var traitSubH = 28
  ctx.font = "22px 'PingFang SC', sans-serif"
  var traitBodyH = measureWrapped(ctx, primary.traitAnalysis || '', CONTENT_W - panelPad * 2, 34)
  var legendH = axisLegend.length * 36
  var panelInnerH = traitTitleH + traitSubH + 8 + traitBodyH + 20 + radarSize + 16 + legendH
  var panelH = panelPad * 2 + panelInnerH

  push(function (c, top) {
    roundRectPath(c, PAD, top, CONTENT_W, panelH, 20)
    c.fillStyle = 'rgba(0,0,0,0.22)'
    c.fill()
    c.strokeStyle = 'rgba(212,180,131,0.16)'
    c.lineWidth = 1
    c.stroke()

    var iy = top + panelPad + 22
    c.fillStyle = '#f3e6d0'
    c.font = "bold 26px 'Songti SC', 'STSong', serif"
    c.fillText('特质分析', PAD + panelPad, iy)
    iy += traitTitleH

    c.fillStyle = '#a89478'
    c.font = "20px 'PingFang SC', sans-serif"
    c.fillText('由你的抉择生成', PAD + panelPad, iy)
    iy += traitSubH

    c.fillStyle = '#a89478'
    c.font = "22px 'PingFang SC', sans-serif"
    iy += drawWrapped(c, primary.traitAnalysis || '', PAD + panelPad, iy, CONTENT_W - panelPad * 2, 34) + 16

    var radarX = PAD + (CONTENT_W - radarSize) / 2
    drawRadar(c, options.axes, radarX, iy, radarSize)
    iy += radarSize + 12

    axisLegend.forEach(function (item) {
      c.fillStyle = '#f6ead4'
      c.font = "20px 'PingFang SC', sans-serif"
      c.fillText(item.name, PAD + panelPad, iy + 14)
      c.fillStyle = '#d4b483'
      c.font = "20px 'Songti SC', serif"
      var val = String(item.value)
      c.fillText(val, W - PAD - panelPad - c.measureText(val).width, iy + 14)
      var barX = PAD + panelPad
      var barW = CONTENT_W - panelPad * 2
      var barY = iy + 20
      roundRectPath(c, barX, barY, barW, 6, 3)
      c.fillStyle = 'rgba(255,255,255,0.08)'
      c.fill()
      roundRectPath(c, barX, barY, barW * (item.value / 100), 6, 3)
      c.fillStyle = '#d4b483'
      c.fill()
      iy += 36
    })
  }, panelH + 28)

  // analysis blocks
  var analysisBlocks = [
    { title: '整体画像', body: primary.summary },
    { title: '你的锋芒', body: primary.strengths },
    { title: '你的盲区', body: primary.blindSpot },
    { title: '在关系里', body: primary.inRelation },
    { title: '可以怎么长', body: primary.growth },
  ]
  analysisBlocks.forEach(function (block) {
    if (!block.body) return
    ctx.font = "bold 24px 'Songti SC', 'STSong', serif"
    var th = 30
    ctx.font = "22px 'PingFang SC', sans-serif"
    var bh = measureWrapped(ctx, block.body, CONTENT_W, 36)
    var blockH = th + 10 + bh + 20
    push(function (c, top) {
      c.fillStyle = '#d4b483'
      c.font = "bold 24px 'Songti SC', 'STSong', serif"
      c.fillText(block.title, PAD, top + 22)
      c.fillStyle = 'rgba(246,234,212,0.92)'
      c.font = "22px 'PingFang SC', sans-serif"
      drawWrapped(c, block.body, PAD, top + 22 + th + 8, CONTENT_W, 36)
    }, blockH)
  })

  // nextStep（空间允许则写入；过长时 buildLayout 仍会完整排版，由高度上限自然裁切风险低）
  if (primary.nextStep) {
    ctx.font = "20px 'PingFang SC', sans-serif"
    var nextLabelH = 28
    ctx.font = "22px 'PingFang SC', sans-serif"
    var nextBodyH = measureWrapped(ctx, primary.nextStep, CONTENT_W - 48, 34)
    var nextH = 28 + nextLabelH + 8 + nextBodyH + 28
    push(function (c, top) {
      roundRectPath(c, PAD, top, CONTENT_W, nextH, 20)
      c.fillStyle = 'rgba(212,180,131,0.08)'
      c.fill()
      c.strokeStyle = 'rgba(212,180,131,0.28)'
      c.lineWidth = 1
      c.stroke()

      var ny = top + 28 + 18
      c.fillStyle = '#d4b483'
      c.font = "20px 'PingFang SC', sans-serif"
      c.fillText('今晚可以去感受', PAD + 24, ny)
      ny += nextLabelH + 8

      c.fillStyle = 'rgba(246,234,212,0.92)'
      c.font = "22px 'PingFang SC', sans-serif"
      drawWrapped(c, primary.nextStep, PAD + 24, ny, CONTENT_W - 48, 34)
    }, nextH + 28)
  }

  // shadow card
  ctx.font = "20px 'PingFang SC', sans-serif"
  var shadowKickerH = 26
  var shadowLabelH = 28
  ctx.font = "bold 28px 'Songti SC', 'STSong', serif"
  var shadowNameH = 36
  ctx.font = "20px 'PingFang SC', sans-serif"
  var shadowTagH = measureWrapped(
    ctx,
    shadow.epithet ? shadow.epithet + ' · ' + shadow.tagline : shadow.tagline,
    CONTENT_W - 48,
    30,
  )
  ctx.font = "22px 'PingFang SC', sans-serif"
  var shadowBodyH = measureWrapped(ctx, shadow.summary || '', CONTENT_W - 48, 34)
  var shadowH = 28 + shadowKickerH + shadowLabelH + shadowNameH + 8 + shadowTagH + 12 + shadowBodyH + 28

  push(function (c, top) {
    roundRectPath(c, PAD, top, CONTENT_W, shadowH, 20)
    c.fillStyle = 'rgba(122,46,40,0.22)'
    c.fill()
    c.strokeStyle = 'rgba(122,46,40,0.45)'
    c.lineWidth = 1
    c.stroke()

    var sy = top + 28 + 18
    c.fillStyle = '#a89478'
    c.font = "18px 'PingFang SC', sans-serif"
    c.fillText('若命运再偏一点', PAD + 24, sy)
    sy += shadowKickerH

    c.fillStyle = '#d4b483'
    c.font = "20px 'PingFang SC', sans-serif"
    c.fillText('你的暗影搭档', PAD + 24, sy)
    sy += shadowLabelH

    c.fillStyle = '#f3e6d0'
    c.font = "bold 28px 'Songti SC', 'STSong', serif"
    c.fillText(shadow.name, PAD + 24, sy)
    sy += shadowNameH

    c.fillStyle = '#a89478'
    c.font = "20px 'PingFang SC', sans-serif"
    sy += drawWrapped(
      c,
      shadow.epithet ? shadow.epithet + ' · ' + shadow.tagline : shadow.tagline,
      PAD + 24,
      sy,
      CONTENT_W - 48,
      30,
    ) + 10

    c.fillStyle = 'rgba(246,234,212,0.88)'
    c.font = "22px 'PingFang SC', sans-serif"
    drawWrapped(c, shadow.summary || '', PAD + 24, sy, CONTENT_W - 48, 34)
  }, shadowH + 28)

  // footer
  push(function (c, top) {
    c.fillStyle = 'rgba(168,148,120,0.85)'
    c.font = "18px 'PingFang SC', sans-serif"
    c.fillText('fancy-world · 测测你的陀氏人格', PAD, top + 18)
  }, 40)

  return { height: y + PAD, blocks: blocks }
}

function exportShareImage(options) {
  const canvas = options.canvas
  const primary = options.primary
  const shadow = options.shadow
  const component = options.component
  const axes = options.axes || primary.axes || {}
  const axisLegend = options.axisLegend || AXIS_ORDER.map(function (name) {
    return {
      name: name,
      value: Math.max(0, Math.min(100, Number(axes[name]) || 0)),
    }
  })

  const measureCtx = canvas.getContext('2d')
  if (!measureCtx) return Promise.reject(new Error('canvas context unavailable'))

  // temporary font metrics on a small canvas; we'll resize after measure
  canvas.width = W
  canvas.height = 100
  const layout = buildLayout(measureCtx, {
    primary: primary,
    shadow: shadow,
    axes: axes,
    axisLegend: axisLegend,
  })
  const H = Math.ceil(layout.height)
  const scale = pickScale(H)

  canvas.width = Math.floor(W * scale)
  canvas.height = Math.floor(H * scale)
  const ctx = canvas.getContext('2d')
  ctx.scale(scale, scale)

  const gradient = ctx.createLinearGradient(0, 0, W, H)
  gradient.addColorStop(0, '#16110d')
  gradient.addColorStop(0.4, '#0c0907')
  gradient.addColorStop(1, '#1c120f')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, W, H)

  ctx.fillStyle = 'rgba(122, 46, 40, 0.18)'
  ctx.beginPath()
  ctx.arc(W * 0.1, 80, 180, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = 'rgba(212, 180, 131, 0.1)'
  ctx.beginPath()
  ctx.arc(W * 0.9, 160, 160, 0, Math.PI * 2)
  ctx.fill()

  ctx.strokeStyle = 'rgba(212, 180, 131, 0.2)'
  ctx.lineWidth = 1.5
  roundRectPath(ctx, 16, 16, W - 32, H - 32, 24)
  ctx.stroke()

  return loadImage(canvas, characterImage(primary))
    .catch(function () { return loadImage(canvas, PLACEHOLDER_IMAGE) })
    .catch(function () { return null })
    .then(function (portrait) {
      layout.blocks.forEach(function (block) {
        block.draw(ctx, block.y, portrait)
      })
      return ensureAlbumAuth()
    })
    .then(function (ok) {
      if (!ok) throw new Error('未获得相册权限')
      return new Promise(function (resolve, reject) {
        wx.canvasToTempFilePath({
          canvas: canvas,
          fileType: 'png',
          quality: 1,
          success: function (res) { resolve(res.tempFilePath) },
          fail: reject,
        }, component)
      })
    })
    .then(function (temp) {
      return wx.saveImageToPhotosAlbum({ filePath: temp })
    })
}

module.exports = {
  exportShareImage,
}
