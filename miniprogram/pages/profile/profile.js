const collection = require('../../utils/collection')
const { characterImage } = require('../../utils/quiz')
const characters = require('../../utils/characters-data')

Page({
  data: {
    collectionUnlocked: 0,
    collectionTotal: 0,
    collectionProgressText: '',
    hasCollection: false,
    lastResult: null,
    galleryVisible: false,
    galleryItems: [],
    galleryDetail: null,
  },

  onShow() {
    this.refresh()
  },

  refresh() {
    var progress = collection.getProgress(characters.length)
    var state = collection.getState()
    var lastResult = null
    if (state.lastResult && state.lastResult.primaryId) {
      var primary = null
      for (var i = 0; i < characters.length; i += 1) {
        if (characters[i].id === state.lastResult.primaryId) {
          primary = characters[i]
          break
        }
      }
      if (primary) {
        lastResult = {
          id: primary.id,
          name: primary.name,
          epithet: primary.epithet || '',
          tagline: primary.tagline || '',
          bookTitle: primary.bookTitle || '',
          image: characterImage(primary),
        }
      }
    }

    this.setData({
      collectionUnlocked: progress.unlocked,
      collectionTotal: progress.total,
      collectionProgressText: '已遇见 ' + progress.unlocked + ' / ' + progress.total,
      hasCollection: progress.unlocked > 0,
      lastResult: lastResult,
    })
  },

  onGoQuiz() {
    wx.switchTab({ url: '/pages/quiz/quiz' })
  },

  onOpenGallery() {
    var items = collection.listForGallery(characters, {
      characterImage: characterImage,
    })
    this.setData({
      galleryVisible: true,
      galleryItems: items,
      galleryDetail: null,
    })
  },

  onCloseGallery() {
    this.setData({
      galleryVisible: false,
      galleryDetail: null,
    })
  },

  onTapGalleryItem(e) {
    var id = e.currentTarget.dataset.id
    var unlockedFlag = e.currentTarget.dataset.unlocked
    var unlocked = unlockedFlag === true || unlockedFlag === 'true'
    if (!unlocked) {
      wx.showToast({ title: '再答一轮，或许会遇见', icon: 'none' })
      return
    }
    var items = this.data.galleryItems || []
    var found = null
    for (var i = 0; i < items.length; i += 1) {
      if (items[i].id === id) {
        found = items[i]
        break
      }
    }
    if (!found) return
    this.setData({ galleryDetail: found })
  },

  onCloseGalleryDetail() {
    this.setData({ galleryDetail: null })
  },

  onGalleryDetailCatch() {},
})
