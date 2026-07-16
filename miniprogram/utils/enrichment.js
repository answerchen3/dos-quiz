const { assetUrl } = require('./quiz')
const { CLOUD_ASSET_PREFIX } = require('./config')
const comicsData = require('./comics-data')
const sceneryData = require('./scenery-data')
const enrichmentMeta = require('./enrichment-meta')
const bookBgData = require('./book-bg-data')
const collection = require('./collection')

function resolveEnrichImage(rel, fallback) {
  if (!rel) return fallback || ''
  if (!CLOUD_ASSET_PREFIX && /^comics\//.test(rel)) {
    return fallback || ''
  }
  return assetUrl(rel)
}

function getBookComic(character) {
  if (!character) return null
  var map = enrichmentMeta.characterBook || {}
  var slug = map[character.id]
  if (!slug || !comicsData[slug]) return null
  var comic = comicsData[slug]
  return {
    bookSlug: comic.bookSlug,
    bookTitle: comic.bookTitle || character.bookTitle,
    pages: (comic.pages || []).map(function (page) {
      return {
        id: page.id,
        narration: page.narration || '',
        image: resolveEnrichImage(page.image, ''),
      }
    }),
  }
}

/**
 * 全书主要人物：characters-data 中映射到该书、且非 hidden 的角色
 * （hidden 如拉祖米欣不计入解锁门槛）
 */
function getMainCharacterIdsForBook(bookSlug, characters) {
  if (!bookSlug) return []
  var map = enrichmentMeta.characterBook || {}
  var ids = []
  ;(characters || []).forEach(function (c) {
    if (!c || !c.id || c.hidden) return
    if (map[c.id] === bookSlug) ids.push(c.id)
  })
  return ids
}

/** 图鉴是否已集齐该书主要人物（可解锁漫画） */
function isBookComicUnlocked(bookSlug, characters) {
  var ids = getMainCharacterIdsForBook(bookSlug, characters)
  if (!ids.length) return false
  for (var i = 0; i < ids.length; i += 1) {
    if (!collection.isUnlocked(ids[i])) return false
  }
  return true
}

function getSnowUrl() {
  return sceneryData && sceneryData.snow ? assetUrl(sceneryData.snow) : ''
}

function bookHintToSlug(bookHint) {
  var raw = String(bookHint || '')
    .replace(/^《/, '')
    .replace(/》$/, '')
    .trim()
  if (!raw || raw === '跨书') return null
  var titles = enrichmentMeta.bookTitle || {}
  var keys = Object.keys(titles)
  for (var i = 0; i < keys.length; i += 1) {
    if (titles[keys[i]] === raw) return keys[i]
  }
  return null
}

/** 答题页：当前书主角 bg（需已上传云 bgs/） */
function getBookQuizBgUrl(bookHint) {
  var slug = bookHintToSlug(bookHint)
  if (!slug) return ''
  var protagonist = (bookBgData.bookProtagonist || {})[slug]
  if (!protagonist) return ''
  if (!CLOUD_ASSET_PREFIX) return ''
  return assetUrl('bgs/' + protagonist + '-bg.png')
}

module.exports = {
  getBookComic,
  getMainCharacterIdsForBook,
  isBookComicUnlocked,
  getSnowUrl,
  getBookQuizBgUrl,
  bookHintToSlug,
  resolveEnrichImage,
}
