const { assetUrl } = require('../../utils/quiz')
const { toDisplayUrls } = require('../../utils/cloud-url')
const collection = require('../../utils/collection')
const readingNotes = require('../../utils/reading-notes')
const { exportJournalImage, todayStr } = require('../../utils/journal-canvas')

var quotes = require('../../utils/quotes-data')
var bookBgData = require('../../utils/book-bg-data')
var characters = require('../../utils/characters-data')

function dayOfYear(d) {
  var dt = d || new Date()
  var start = new Date(dt.getFullYear(), 0, 0)
  var diff = dt - start
  return Math.floor(diff / 86400000)
}

function getTodayQuote() {
  var list = quotes || []
  if (!list.length) return { text: '', book: '', character: '' }
  var idx = dayOfYear() % list.length
  return Object.assign({ index: idx }, list[idx])
}

function charById(id) {
  for (var i = 0; i < characters.length; i += 1) {
    if (characters[i].id === id) return characters[i]
  }
  return null
}

function buildBgOptions() {
  var map = bookBgData.bookProtagonist || {}
  var slugs = Object.keys(map)
  var opts = []
  slugs.forEach(function (slug) {
    var cid = map[slug]
    var c = charById(cid)
    var bgSrc = assetUrl('bgs/' + cid + '-bg.png')
    if (!bgSrc || bgSrc.indexOf('cloud://') !== 0) return // 未配云，跳过
    opts.push({
      characterId: cid,
      bookSlug: slug,
      name: (c && c.name) || cid,
      bookTitle: (c && c.bookTitle) || slug,
      bgSrc: bgSrc, // cloud:// 原始串，渲染时换链
      displayUrl: '', // 异步填充
      unlocked: collection.isUnlocked(cid),
    })
  })
  return opts
}

Page({
  data: {
    todayQuote: { text: '', book: '', character: '', index: 0 },
    dateStr: '',
    noteText: '',
    bgOptions: [],
    selectedBgCharacterId: '',
    selectedBgDisplayUrl: '',
    generating: false,
    previewImage: '',
    notes: [],
    previewNote: null, // 历史大图查看
    showPreview: false,
  },

  onLoad() {
    this.refreshAll()
  },

  onShow() {
    // 解锁状态可能因答题变化，每次展示刷新
    this.refreshBgOptions()
  },

  refreshAll() {
    var q = getTodayQuote()
    this.setData({
      todayQuote: q,
      dateStr: todayStr(),
      notes: readingNotes.getNotes(),
    })
    this.refreshBgOptions(true)
  },

  refreshBgOptions(forceResolve) {
    var opts = buildBgOptions()
    var prev = this.data.bgOptions || []
    var prevSel = this.data.selectedBgCharacterId
    // 复用已解析的 displayUrl
    if (!forceResolve && prev.length) {
      var prevMap = {}
      prev.forEach(function (o) { prevMap[o.characterId] = o.displayUrl })
      opts.forEach(function (o) {
        if (prevMap[o.characterId]) o.displayUrl = prevMap[o.characterId]
      })
    }

    // 若当前选中仍在列表中且已解锁，保持选中；否则取第一个已解锁
    var selId = prevSel
    var selOpt = null
    if (selId) selOpt = opts.find(function (o) { return o.characterId === selId && o.unlocked })
    if (!selOpt) selOpt = opts.find(function (o) { return o.unlocked })
    if (!selOpt) selOpt = opts[0] || null

    this.setData({
      bgOptions: opts,
      selectedBgCharacterId: selOpt ? selOpt.characterId : '',
      selectedBgDisplayUrl: selOpt ? selOpt.displayUrl : '',
    })

    this.resolveBgDisplayUrls(opts, selOpt)
  },

  resolveBgDisplayUrls(opts, selOpt) {
    var that = this
    var cloudIds = opts
      .filter(function (o) { return !o.displayUrl })
      .map(function (o) { return o.bgSrc })
    if (!cloudIds.length) return
    toDisplayUrls(cloudIds)
      .then(function (urls) {
        var map = {}
        cloudIds.forEach(function (id, i) { map[id] = urls[i] || '' })
        var next = opts.map(function (o) {
          return Object.assign({}, o, {
            displayUrl: o.displayUrl || map[o.bgSrc] || '',
          })
        })
        var patch = { bgOptions: next }
        if (selOpt && selOpt.characterId === that.data.selectedBgCharacterId) {
          var cur = next.find(function (o) { return o.characterId === selOpt.characterId })
          if (cur) patch.selectedBgDisplayUrl = cur.displayUrl
        } else {
          var curSel = next.find(function (o) { return o.characterId === that.data.selectedBgCharacterId })
          if (curSel) patch.selectedBgDisplayUrl = curSel.displayUrl
        }
        that.setData(patch)
      })
      .catch(function (err) {
        console.error('[community] resolve bg urls failed', err)
      })
  },

  onNoteInput(e) {
    this.setData({ noteText: e.detail.value || '' })
  },

  onSelectBg(e) {
    var cid = e.currentTarget.dataset.id
    var opt = (this.data.bgOptions || []).find(function (o) { return o.characterId === cid })
    if (!opt) return
    if (!opt.unlocked) {
      wx.showToast({ title: '先收录该角色再解锁底图', icon: 'none' })
      return
    }
    this.setData({
      selectedBgCharacterId: cid,
      selectedBgDisplayUrl: opt.displayUrl || '',
    })
  },

  onGenerate() {
    if (this.data.generating) return
    var that = this
    var noteText = (this.data.noteText || '').trim()
    if (!noteText) {
      wx.showToast({ title: '先写点什么吧', icon: 'none' })
      return
    }
    var selOpt = (this.data.bgOptions || []).find(function (o) {
      return o.characterId === that.data.selectedBgCharacterId
    })
    if (!selOpt || !selOpt.unlocked) {
      wx.showToast({ title: '请选择已解锁的底图', icon: 'none' })
      return
    }

    this.setData({ generating: true })
    wx.showLoading({ title: '生成手帐…', mask: true })

    new Promise(function (resolve, reject) {
      wx.createSelectorQuery()
        .select('#journalCanvas')
        .fields({ node: true, size: true })
        .exec(function (res) {
          var node = res && res[0] && res[0].node
          if (!node) reject(new Error('journal canvas missing'))
          else resolve(node)
        })
    })
      .then(function (canvas) {
        return exportJournalImage({
          canvas: canvas,
          component: that,
          bgSrc: selOpt.bgSrc,
          noteText: noteText,
          dateStr: that.data.dateStr,
        })
      })
      .then(function (tempPath) {
        that.setData({ previewImage: tempPath })
        readingNotes.addNote({
          date: that.data.dateStr,
          noteText: noteText,
          bgCharacterId: selOpt.characterId,
          imagePath: tempPath,
        })
        that.setData({ notes: readingNotes.getNotes() })
        wx.showToast({ title: '已生成', icon: 'success' })
      })
      .catch(function (err) {
        console.error('[community] generate failed', err)
        wx.showToast({ title: '生成失败', icon: 'none' })
      })
      .then(function () {
        wx.hideLoading()
        that.setData({ generating: false })
      })
  },

  onSaveToAlbum() {
    var path = this.data.previewImage
    if (!path) {
      wx.showToast({ title: '请先生成', icon: 'none' })
      return
    }
    var that = this
    wx.getSetting()
      .then(function (setting) {
        if (setting.authSetting['scope.writePhotosAlbum']) return true
        return wx.authorize({ scope: 'scope.writePhotosAlbum' }).then(function () { return true }).catch(function () {
          return wx.showModal({
            title: '需要相册权限',
            content: '请在设置中开启「保存到相册」，以便保存手帐图。',
            confirmText: '去设置',
          }).then(function (modal) {
            if (!modal.confirm) return false
            return wx.openSetting().then(function () { return wx.getSetting() }).then(function (s) {
              return !!s.authSetting['scope.writePhotosAlbum']
            })
          })
        })
      })
      .then(function (ok) {
        if (!ok) throw new Error('未获得相册权限')
        return wx.saveImageToPhotosAlbum({ filePath: path })
      })
      .then(function () {
        wx.showToast({ title: '已保存到相册', icon: 'success' })
      })
      .catch(function (err) {
        console.error('[community] save album failed', err)
        var msg = (err && (err.errMsg || err.message)) || ''
        if (msg.indexOf('未获得') === -1) {
          wx.showToast({ title: '保存失败', icon: 'none' })
        }
      })
  },

  onPreviewNote(e) {
    var id = e.currentTarget.dataset.id
    var note = readingNotes.getNoteById(id)
    if (!note) return
    if (note.imagePath) {
      wx.previewImage({ urls: [note.imagePath] })
    } else {
      this.setData({ previewNote: note, showPreview: true })
    }
  },

  onClosePreview() {
    this.setData({ showPreview: false, previewNote: null })
  },

  onPreviewImageTap() {
    if (!this.data.previewImage) return
    wx.previewImage({ urls: [this.data.previewImage] })
  },

  onGoQuiz() {
    wx.switchTab({ url: '/pages/quiz/quiz' })
  },

  onShareAppMessage() {
    var title = '陀氏手帐 · 写下你的感受'
    return {
      title: title,
      path: '/pages/community/community',
    }
  },
})
