const { assetUrl } = require('./quiz')
const { CLOUD_ASSET_PREFIX } = require('./config')
const comicsData = require('./comics-data')
const sceneryData = require('./scenery-data')
const enrichmentMeta = require('./enrichment-meta')
const bookBgData = require('./book-bg-data')

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
  getSnowUrl,
  getBookQuizBgUrl,
  bookHintToSlug,
  resolveEnrichImage,
}
