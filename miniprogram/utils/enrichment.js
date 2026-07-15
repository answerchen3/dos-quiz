const { assetUrl } = require('./quiz')
const { CLOUD_ASSET_PREFIX } = require('./config')
const comicsData = require('./comics-data')
const sceneryData = require('./scenery-data')
const enrichmentMeta = require('./enrichment-meta')

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

module.exports = {
  getBookComic,
  getSnowUrl,
  resolveEnrichImage,
}
