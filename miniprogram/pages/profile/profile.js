const collection = require('../../utils/collection')
const { characterImage } = require('../../utils/quiz')
const { toDisplayUrl, toDisplayUrls, safeDisplayUrl } = require('../../utils/cloud-url')
const {
  listBookComicsProgress,
  getComicByBookSlug,
  isBookComicUnlocked,
} = require('../../utils/enrichment')
const characters = require('../../utils/characters-data')

Page({
  data: {
    collectionUnlocked: 0,
    collectionTotal: 0,
    collectionProgressText: '',
    comicProgressText: '',
    hasCollection: false,
    lastResult: null,
    galleryVisible: false,
    comicGalleryVisible: false,
    galleryItems: [],
    galleryDetail: null,
    comicBooks: [],
    comicVisible: false,
    comicPages: [],
    comicBookTitle: '',
    comicPageIndex: 0,
  },

  onShow() {
    this.refresh()
    var openGalleryOnce = false
    var openComicOnce = false
    try {
      openGalleryOnce = !!wx.getStorageSync('dos.openGalleryOnce')
      if (openGalleryOnce) wx.removeStorageSync('dos.openGalleryOnce')
      openComicOnce = !!wx.getStorageSync('dos.openComicGalleryOnce')
      if (openComicOnce) wx.removeStorageSync('dos.openComicGalleryOnce')
    } catch (e) {}
    if (openComicOnce) {
      this.onOpenComicGallery()
    } else if (openGalleryOnce) {
      this.onOpenGallery()
    }
  },

  refresh() {
    var progress = collection.getProgress(characters.length)
    var state = collection.getState()
    var comicBooks = listBookComicsProgress(characters)
    var comicUnlocked = 0
    for (var c = 0; c < comicBooks.length; c += 1) {
      if (comicBooks[c].unlocked) comicUnlocked += 1
    }
    var lastResult = null
    var lastCloud = ''
    if (state.lastResult && state.lastResult.primaryId) {
      var primary = null
      for (var i = 0; i < characters.length; i += 1) {
        if (characters[i].id === state.lastResult.primaryId) {
          primary = characters[i]
          break
        }
      }
      if (primary) {
        lastCloud = characterImage(primary)
        lastResult = {
          id: primary.id,
          name: primary.name,
          epithet: primary.epithet || '',
          tagline: primary.tagline || '',
          bookTitle: primary.bookTitle || '',
          image: '',
        }
      }
    }

    this.setData({
      collectionUnlocked: progress.unlocked,
      collectionTotal: progress.total,
      collectionProgressText: '已遇见 ' + progress.unlocked + ' / ' + progress.total,
      comicProgressText: '已解锁 ' + comicUnlocked + ' / ' + comicBooks.length + ' 部',
      hasCollection: progress.unlocked > 0,
      lastResult: lastResult,
      comicBooks: comicBooks,
    })

    if (!lastResult || !lastCloud) return
    var that = this
    toDisplayUrl(lastCloud)
      .then(function (url) {
        that.setData({
          lastResult: Object.assign({}, lastResult, {
            image: safeDisplayUrl(url),
          }),
        })
      })
      .catch(function (err) {
        console.error('[profile] resolve last result', err)
      })
  },

  onGoQuiz() {
    wx.switchTab({ url: '/pages/quiz/quiz' })
  },

  onOpenGallery() {
    var items = collection.listForGallery(characters, {
      characterImage: characterImage,
    })
    var that = this
    this.setData({
      galleryVisible: true,
      comicGalleryVisible: false,
      galleryItems: items.map(function (item) {
        return Object.assign({}, item, {
          image: item.unlocked ? '' : item.image,
        })
      }),
      galleryDetail: null,
    })
    var cloudList = items.map(function (item) {
      return item.unlocked ? item.image : ''
    })
    toDisplayUrls(cloudList)
      .then(function (urls) {
        that.setData({
          galleryItems: items.map(function (item, i) {
            return Object.assign({}, item, {
              image: item.unlocked ? safeDisplayUrl(urls[i]) : '',
            })
          }),
        })
      })
      .catch(function (err) {
        console.error('[profile] resolve gallery', err)
        that.setData({
          galleryItems: items.map(function (item) {
            return Object.assign({}, item, {
              image: item.unlocked ? safeDisplayUrl(item.image) : '',
            })
          }),
        })
      })
  },

  onCloseGallery() {
    this.setData({
      galleryVisible: false,
      galleryDetail: null,
    })
  },

  onOpenComicGallery() {
    this.setData({
      comicGalleryVisible: true,
      galleryVisible: false,
      galleryDetail: null,
      comicBooks: listBookComicsProgress(characters),
    })
  },

  onCloseComicGallery() {
    this.setData({ comicGalleryVisible: false })
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

  onTapComicBook(e) {
    var slug = e.currentTarget.dataset.slug
    var unlockedFlag = e.currentTarget.dataset.unlocked
    var unlocked = unlockedFlag === true || unlockedFlag === 'true'
    if (!slug) return
    if (!unlocked) {
      var title = e.currentTarget.dataset.title || ''
      wx.showToast({
        title: '集齐《' + title + '》主要人物后解锁漫画',
        icon: 'none',
      })
      return
    }
    this.openComic(slug)
  },

  openComic(bookSlug) {
    if (!isBookComicUnlocked(bookSlug, characters)) {
      wx.showToast({ title: '漫画尚未解锁', icon: 'none' })
      return
    }
    var comic = getComicByBookSlug(bookSlug)
    if (!comic || !comic.pages || !comic.pages.length) {
      wx.showToast({ title: '漫画暂不可用', icon: 'none' })
      return
    }
    var that = this
    var rawPages = comic.pages
    var cloudList = rawPages.map(function (p) {
      return p.image || ''
    })
    toDisplayUrls(cloudList)
      .then(function (urls) {
        that.setData({
          comicVisible: true,
          comicPages: rawPages.map(function (page, i) {
            return Object.assign({}, page, { image: safeDisplayUrl(urls[i]) })
          }),
          comicBookTitle: comic.bookTitle,
          comicPageIndex: 0,
        })
      })
      .catch(function (err) {
        console.error('[profile] resolve comic', err)
        that.setData({
          comicVisible: true,
          comicPages: rawPages.map(function (page) {
            return Object.assign({}, page, {
              image: safeDisplayUrl(page.image),
            })
          }),
          comicBookTitle: comic.bookTitle,
          comicPageIndex: 0,
        })
      })
  },

  onCloseComic() {
    this.setData({ comicVisible: false })
  },

  onComicChange(e) {
    this.setData({ comicPageIndex: e.detail.current || 0 })
  },
})
