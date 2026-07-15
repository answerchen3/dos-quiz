const { AXIS_ORDER } = require('./quiz')

function buildRadarGeometry(axes, size, radius) {
  size = size || 320
  radius = radius || 108
  const cx = size / 2
  const cy = size / 2
  const n = AXIS_ORDER.length
  const levels = 4

  function pointAt(i, r) {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / n
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    }
  }

  const gridPolygons = []
  for (let lv = 1; lv <= levels; lv++) {
    const r = (radius * lv) / levels
    gridPolygons.push(
      AXIS_ORDER.map((_, i) => {
        const p = pointAt(i, r)
        return p.x + ',' + p.y
      }).join(' '),
    )
  }

  const axisLines = AXIS_ORDER.map((_, i) => {
    const p = pointAt(i, radius)
    return { x2: p.x, y2: p.y }
  })

  const labels = AXIS_ORDER.map((name, i) => {
    const p = pointAt(i, radius + 24)
    return { name: name, x: p.x, y: p.y }
  })

  const dots = AXIS_ORDER.map((name, i) => {
    const v = Math.max(0, Math.min(100, Number(axes[name]) || 0))
    return pointAt(i, (radius * v) / 100)
  })

  const areaPoints = dots.map((p) => p.x + ',' + p.y).join(' ')

  return { gridPolygons, axisLines, labels, areaPoints, dots, cx, cy }
}

function parseArea(points) {
  return points.split(' ').map(function (p) {
    return p.split(',').map(Number)
  })
}

function strokeArea(ctx, points, style) {
  var area = parseArea(points)
  ctx.beginPath()
  area.forEach(function (xy, i) {
    if (i === 0) ctx.moveTo(xy[0], xy[1])
    else ctx.lineTo(xy[0], xy[1])
  })
  ctx.closePath()
  if (style.fill) {
    ctx.fillStyle = style.fill
    ctx.fill()
  }
  if (style.stroke) {
    ctx.strokeStyle = style.stroke
    ctx.lineWidth = style.lineWidth || 1.5
    if (style.dash) ctx.setLineDash(style.dash)
    else ctx.setLineDash([])
    ctx.stroke()
    ctx.setLineDash([])
  }
}

/** 绘制用户 vs 角色双雷达 */
function drawDualRadar(ctx, userAxes, characterAxes, width, height) {
  var size = Math.min(width, height)
  var gUser = buildRadarGeometry(userAxes || {}, 320, 108)
  var gChar = buildRadarGeometry(characterAxes || {}, 320, 108)
  var scale = size / 320
  ctx.clearRect(0, 0, width, height)
  ctx.save()
  ctx.translate((width - size) / 2, (height - size) / 2)
  ctx.scale(scale, scale)

  gUser.gridPolygons.forEach(function (pts) {
    var pairs = parseArea(pts)
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

  gUser.axisLines.forEach(function (l) {
    ctx.beginPath()
    ctx.moveTo(gUser.cx, gUser.cy)
    ctx.lineTo(l.x2, l.y2)
    ctx.strokeStyle = 'rgba(212,180,131,0.22)'
    ctx.lineWidth = 1
    ctx.stroke()
  })

  gUser.labels.forEach(function (l) {
    ctx.fillStyle = '#d4b483'
    ctx.font = '13px PingFang SC'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(l.name, l.x, l.y)
  })
  ctx.textAlign = 'left'
  ctx.textBaseline = 'alphabetic'

  strokeArea(ctx, gChar.areaPoints, {
    fill: 'rgba(122,46,40,0.18)',
    stroke: 'rgba(186,90,82,0.85)',
    lineWidth: 1.5,
    dash: [6, 4],
  })
  gChar.dots.forEach(function (d) {
    ctx.beginPath()
    ctx.arc(d.x, d.y, 3, 0, Math.PI * 2)
    ctx.fillStyle = '#b45a52'
    ctx.fill()
  })

  strokeArea(ctx, gUser.areaPoints, {
    fill: 'rgba(226,197,146,0.28)',
    stroke: '#d4b483',
    lineWidth: 1.8,
  })
  gUser.dots.forEach(function (d) {
    ctx.beginPath()
    ctx.arc(d.x, d.y, 4, 0, Math.PI * 2)
    ctx.fillStyle = '#e2c592'
    ctx.fill()
  })

  ctx.restore()
}

function buildAxisLegend(axes, hints) {
  hints = hints || {}
  return AXIS_ORDER.map((name) => ({
    name: name,
    value: Math.max(0, Math.min(100, Number(axes[name]) || 0)),
    hint: hints[name],
  }))
}

function similarityPercent(score) {
  var s = Number(score)
  if (Number.isNaN(s)) return 0
  return Math.max(0, Math.min(99, Math.round(((s + 1) / 2) * 100)))
}

module.exports = {
  buildRadarGeometry,
  buildAxisLegend,
  drawDualRadar,
  similarityPercent,
}
