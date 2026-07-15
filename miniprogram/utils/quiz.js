const { CLOUD_ASSET_PREFIX } = require('./config')

const HIDDEN_MARGIN = 0.04
const AXIS_ORDER = ['理性', '怜悯', '激情', '虚无', '自尊', '热忱']
const LOCAL_PLACEHOLDER = '/assets/placeholders/stavrogin.jpg'

/** 允许打进主包的本地资源（其余一律走云或占位） */
const LOCAL_BUNDLE = {
  'placeholders/stavrogin.jpg': true,
  'dostoevsky-start.jpg': true,
}

function normalizeAssetRel(path) {
  return String(path || '')
    .replace(/^\.\//, '')
    .replace(/^\//, '')
    .replace(/^assets\//, '')
}

function assetUrl(path) {
  if (!path) return LOCAL_PLACEHOLDER
  if (/^(cloud:\/\/|https?:\/\/)/.test(path)) return path

  var rel = normalizeAssetRel(path)

  if (CLOUD_ASSET_PREFIX) {
    return CLOUD_ASSET_PREFIX.replace(/\/$/, '') + '/' + rel
  }

  // 未配云：主包只含占位 + 开场图，避免把 portraits/scenes 打进 2MB 限制
  if (LOCAL_BUNDLE[rel] || rel.indexOf('placeholders/') === 0) {
    return '/assets/' + rel
  }
  return LOCAL_PLACEHOLDER
}

const PLACEHOLDER_IMAGE = LOCAL_PLACEHOLDER

function characterImage(character) {
  if (character && character.image) {
    return assetUrl(character.image)
  }
  return PLACEHOLDER_IMAGE
}

function emptyAxes() {
  const scores = {}
  AXIS_ORDER.forEach(function (name) {
    scores[name] = 0
  })
  return scores
}

function computeAxisScores(questions, answers) {
  const scores = emptyAxes()
  answers.forEach(function (optionIndex, qi) {
    if (optionIndex == null) return
    const option = questions[qi] && questions[qi].options[optionIndex]
    if (!option || !option.axes) return
    AXIS_ORDER.forEach(function (name) {
      scores[name] += Number(option.axes[name]) || 0
    })
  })
  return scores
}

function normalizeAxes(raw) {
  const REF = 65
  const out = {}
  AXIS_ORDER.forEach(function (name) {
    const v = Math.round(((raw[name] || 0) / REF) * 100)
    out[name] = Math.max(0, Math.min(100, v))
  })
  return out
}

function centeredCosineSimilarity(a, b) {
  let dot = 0
  let na = 0
  let nb = 0
  AXIS_ORDER.forEach(function (name) {
    const x = (Number(a[name]) || 0) - 50
    const y = (Number(b[name]) || 0) - 50
    dot += x * y
    na += x * x
    nb += y * y
  })
  if (na < 1e-6 || nb < 1e-6) return 0
  return dot / (Math.sqrt(na) * Math.sqrt(nb))
}

function rankCharactersByAxes(characters, userAxes) {
  const priority = {}
  characters.forEach(function (c, i) {
    priority[c.id] = i
  })
  return characters
    .map(function (c) {
      return Object.assign({}, c, {
        score: centeredCosineSimilarity(userAxes, c.axes || {}),
      })
    })
    .sort(function (a, b) {
      if (b.score !== a.score) return b.score - a.score
      return priority[a.id] - priority[b.id]
    })
}

function pickPrimaryAndShadow(ranked) {
  let primary = ranked[0]
  if (primary.hidden) {
    const runner = ranked[1]
    const margin = (primary.score || 0) - ((runner && runner.score) || 0)
    if (margin < HIDDEN_MARGIN) {
      primary =
        ranked.find(function (c) {
          return !c.hidden
        }) || primary
    }
  }
  const shadow =
    ranked.find(function (c) {
      return c.id !== primary.id
    }) || ranked[1]
  return { primary: primary, shadow: shadow }
}

function resolveFlashImage(flash, character) {
  if (flash && flash.image) return assetUrl(flash.image)
  if (character) return characterImage(character)
  return PLACEHOLDER_IMAGE
}

function isSceneFlash(flash) {
  if (!flash) return false
  if (flash.imageKind === 'scene') return true
  return !!(flash.image && String(flash.image).indexOf('/scenes/') !== -1)
}

module.exports = {
  HIDDEN_MARGIN,
  AXIS_ORDER,
  PLACEHOLDER_IMAGE,
  assetUrl,
  characterImage,
  computeAxisScores,
  normalizeAxes,
  centeredCosineSimilarity,
  rankCharactersByAxes,
  pickPrimaryAndShadow,
  resolveFlashImage,
  isSceneFlash,
}
