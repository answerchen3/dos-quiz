const {
  characterImage,
  computeAxisScores,
  normalizeAxes,
  rankCharactersByAxes,
  pickPrimaryAndShadow,
  resolveFlashImage,
  isSceneFlash,
  assetUrl,
} = require('../../utils/quiz')
const { buildAxisLegend, drawDualRadar, similarityPercent } = require('../../utils/radar')
const { exportShareImage } = require('../../utils/share')
const {
  getBookComic,
  getSnowUrl,
} = require('../../utils/enrichment')
const collection = require('../../utils/collection')

const characters = require('../../utils/characters-data')
const questions = require('../../utils/questions-data')
const axesMeta = require('../../utils/axes-data')

const MARKS = ['A', 'B', 'C', 'D']

function pad2(n) {
  return n < 10 ? '0' + n : String(n)
}

function buildDropItems(dropId, newlySet, byId) {
  if (!dropId) return []
  var c = byId[dropId]
  if (!c) return []
  return [
    {
      id: dropId,
      name: c.name,
      image: characterImage(c),
      isNew: !!newlySet[dropId],
    },
  ]
}

Page({
  data: {
    ready: false,
    loadError: false,
    view: 'start',
    index: 0,
    locking: false,
    progressPercent: 0,
    progressLabel: '',
    sceneKicker: '',
    sceneBook: '',
    currentScene: '',
    currentQuote: '',
    currentQuoteSource: '',
    currentOptions: [],
    flashVisible: false,
    flashPhase: '',
    flashImage: '',
    flashWho: '',
    flashLine: '',
    flashIsScene: false,
    resultEyebrow: '',
    isHidden: false,
    resultEpithet: '',
    resultImage: '',
    resultName: '',
    resultBook: '',
    resultTagline: '',
    resultLabels: [],
    resultTraitAnalysis: '',
    resultSummary: '',
    resultStrengths: '',
    resultBlindspot: '',
    resultRelation: '',
    resultGrowth: '',
    resultNextStep: '',
    axisLegend: [],
    matchPercent: 0,
    comicAvailable: false,
    comicTitle: '',
    shadowName: '',
    shadowTagline: '',
    shadowSummary: '',
    sessionMeetItems: [],
    revealPhase: 0,
    sharing: false,
    startPortraitUrl: '',
    snowUrl: '',
    comicVisible: false,
    comicPages: [],
    comicBookTitle: '',
    comicPageIndex: 0,
  },

  answers: [],
  primary: null,
  shadow: null,
  userAxes: null,
  byId: {},
  comicPack: null,
  sessionMetIds: [],
  revealTimers: [],

  onLoad() {
    try {
      var map = {}
      characters.forEach(function (c) {
        map[c.id] = c
      })
      this.byId = map
      this.setData({
        ready: true,
        startPortraitUrl: assetUrl('dostoevsky-start.jpg'),
        snowUrl: getSnowUrl(),
      })
    } catch (e) {
      console.error(e)
      this.setData({ loadError: true, ready: false })
    }
  },

  onUnload() {
    this.clearRevealTimers()
  },

  clearRevealTimers() {
    ;(this.revealTimers || []).forEach(function (t) {
      clearTimeout(t)
    })
    this.revealTimers = []
  },

  onStart() {
    this.answers = Array(questions.length).fill(null)
    this.primary = null
    this.shadow = null
    this.userAxes = null
    this.comicPack = null
    this.sessionMetIds = []
    this.clearRevealTimers()
    this.setData({
      view: 'quiz',
      index: 0,
      locking: false,
      comicVisible: false,
      sessionMeetItems: [],
      revealPhase: 0,
      resultNextStep: '',
    })
    this.renderQuestion(0)
  },

  onRetry() {
    this.onStart()
  },

  onBack() {
    if (this.data.index === 0 || this.data.locking) return
    var index = this.data.index - 1
    this.setData({ index: index })
    this.renderQuestion(index)
  },

  renderQuestion(index) {
    var q = questions[index]
    var total = questions.length
    var current = index + 1
    var bookRaw = (q.bookHint || q.quoteSource || '').replace(/^《|》$/g, '')
    var quoteSource = q.quoteSource || ''
    var quoteSourceRaw = quoteSource.replace(/^《|》$/g, '')
    if (bookRaw && quoteSourceRaw === bookRaw) {
      quoteSource = ''
    }
    this.setData({
      index: index,
      locking: false,
      progressPercent: (current / total) * 100,
      progressLabel: '第 ' + current + ' 幕',
      sceneKicker: '抉择 ' + pad2(current) + ' / ' + pad2(total),
      sceneBook: bookRaw ? '《' + bookRaw + '》' : '',
      currentScene: q.scene,
      currentQuote: q.quote || '',
      currentQuoteSource: quoteSource,
      currentOptions: q.options.map(function (opt, i) {
        return {
          text: opt.text,
          mark: MARKS[i] || String(i + 1),
          selected: false,
          dimmed: false,
        }
      }),
    })
  },

  onSelectOption(e) {
    if (this.data.locking) return
    var optionIndex = Number(e.currentTarget.dataset.index)
    if (Number.isNaN(optionIndex)) return

    this.answers[this.data.index] = optionIndex
    var options = this.data.currentOptions.map(function (opt, i) {
      return Object.assign({}, opt, {
        selected: i === optionIndex,
        dimmed: i !== optionIndex,
      })
    })
    this.setData({ locking: true, currentOptions: options })

    var option = questions[this.data.index].options[optionIndex]
    var that = this
    this.showFlash(option, function () {
      if (that.data.index < questions.length - 1) {
        var next = that.data.index + 1
        that.setData({ index: next })
        that.renderQuestion(next)
        return
      }
      that.finishQuiz()
    })
  },

  showFlash(option, done) {
    var flash = option && option.flash
    if (!flash) {
      done()
      return
    }
    if (flash.characterId) {
      this.sessionMetIds = collection.appendSessionMet(this.sessionMetIds, flash.characterId)
    }
    var character = this.byId[flash.characterId]
    var isScene = isSceneFlash(flash)
    this.setData({
      flashVisible: true,
      flashPhase: 'is-in',
      flashWho: flash.who || (character && character.name) || '',
      flashLine: flash.line || '',
      flashImage: resolveFlashImage(flash, character),
      flashIsScene: isScene,
    })
    var that = this
    setTimeout(function () {
      that.setData({ flashPhase: 'is-out' })
      setTimeout(function () {
        that.setData({ flashVisible: false, flashPhase: '', flashIsScene: false })
        done()
      }, 280)
    }, 1100)
  },

  finishQuiz() {
    var rawAxes = computeAxisScores(questions, this.answers)
    var userAxes = normalizeAxes(rawAxes)
    this.userAxes = userAxes
    var ranked = rankCharactersByAxes(characters, userAxes)
    var picked = pickPrimaryAndShadow(ranked)
    this.primary = picked.primary
    this.shadow = picked.shadow

    var persist = collection.recordQuizUnlocks({
      flashIds: this.sessionMetIds.slice(),
      primaryId: this.primary && this.primary.id,
      shadowId: this.shadow && this.shadow.id,
      allIds: characters.map(function (c) {
        return c.id
      }),
    })
    if (!persist.ok) {
      wx.showToast({ title: '收藏未保存', icon: 'none' })
    }

    var newlySet = {}
    ;(persist.newlyUnlocked || []).forEach(function (id) {
      newlySet[id] = true
    })

    this.renderResult(newlySet, persist.dropId)
    this.setData({ view: 'result', revealPhase: 0 })
    this.scheduleReveal()
    var that = this
    setTimeout(function () {
      that.drawRadar()
    }, 80)
  },

  scheduleReveal() {
    var that = this
    this.clearRevealTimers()
    var steps = [1, 2, 3, 4, 5, 6]
    var delays = [0, 180, 380, 560, 720, 900]
    steps.forEach(function (phase, i) {
      var timer = setTimeout(function () {
        that.setData({ revealPhase: phase })
      }, delays[i])
      that.revealTimers.push(timer)
    })
  },

  renderResult(newlySet, dropId) {
    var primary = this.primary
    var shadow = this.shadow
    var axes = this.userAxes || primary.axes || {}
    var isHidden = !!primary.hidden
    var labels = []
    ;(primary.tags || []).forEach(function (tag) {
      labels.push({ text: tag })
    })
    ;(primary.traits || []).forEach(function (trait) {
      labels.push({ text: trait, soft: true })
    })

    var comic = getBookComic(primary)
    this.comicPack = comic

    var sessionMeetItems = buildDropItems(dropId, newlySet || {}, this.byId)

    this.setData({
      resultEyebrow: isHidden ? '你解锁了隐藏角色' : '你的陀氏人格是',
      isHidden: isHidden,
      resultEpithet: primary.epithet || '',
      resultImage: characterImage(primary),
      resultName: primary.name,
      resultBook: primary.bookTitle,
      resultTagline: primary.tagline,
      resultLabels: labels,
      resultTraitAnalysis: primary.traitAnalysis || '',
      resultSummary: primary.summary,
      resultStrengths: primary.strengths,
      resultBlindspot: primary.blindSpot,
      resultRelation: primary.inRelation,
      resultGrowth: primary.growth,
      resultNextStep: primary.nextStep || '',
      axisLegend: buildAxisLegend(axes, axesMeta.axisHints || {}),
      matchPercent: similarityPercent(primary.score),
      comicAvailable: !!(comic && comic.pages && comic.pages.length),
      comicTitle: comic ? '用漫画看懂《' + comic.bookTitle + '》' : '',
      shadowName: shadow.name,
      shadowTagline: shadow.epithet
        ? shadow.epithet + ' · ' + shadow.tagline
        : shadow.tagline,
      shadowSummary: shadow.summary,
      sessionMeetItems: sessionMeetItems,
    })
  },

  drawRadar() {
    var userAxes = this.userAxes || {}
    var charAxes = (this.primary && this.primary.axes) || {}
    wx.createSelectorQuery()
      .select('#radarCanvas')
      .fields({ node: true, size: true })
      .exec(function (res) {
        var canvas = res && res[0] && res[0].node
        if (!canvas) return
        var width = res[0].width || 320
        var height = res[0].height || 320
        var dpr = wx.getSystemInfoSync().pixelRatio || 2
        canvas.width = width * dpr
        canvas.height = height * dpr
        var ctx = canvas.getContext('2d')
        if (!ctx) return
        ctx.scale(dpr, dpr)
        drawDualRadar(ctx, userAxes, charAxes, width, height)
      })
  },

  onOpenComic() {
    var comic = this.comicPack
    if (!comic || !comic.pages || !comic.pages.length) {
      wx.showToast({ title: '漫画暂不可用', icon: 'none' })
      return
    }
    this.setData({
      comicVisible: true,
      comicPages: comic.pages,
      comicBookTitle: comic.bookTitle,
      comicPageIndex: 0,
    })
  },

  onCloseComic() {
    this.setData({ comicVisible: false })
  },

  onComicChange(e) {
    this.setData({ comicPageIndex: e.detail.current || 0 })
  },

  onShareAppMessage() {
    var primary = this.primary
    if (primary && primary.shareHook) {
      return {
        title: primary.shareHook,
        path: '/pages/quiz/quiz',
      }
    }
    return {
      title: '测测你的陀氏人格，看看你是谁',
      path: '/pages/quiz/quiz',
    }
  },

  onShare() {
    if (!this.primary || !this.shadow || this.data.sharing) return
    var that = this
    this.setData({ sharing: true })
    wx.showLoading({ title: '生成长图…', mask: true })

    new Promise(function (resolve, reject) {
      wx.createSelectorQuery()
        .select('#shareCanvas')
        .fields({ node: true, size: true })
        .exec(function (res) {
          var node = res && res[0] && res[0].node
          if (!node) reject(new Error('share canvas missing'))
          else resolve(node)
        })
    })
      .then(function (canvas) {
        return exportShareImage({
          canvas: canvas,
          component: that,
          primary: that.primary,
          shadow: that.shadow,
          axes: that.userAxes || that.primary.axes || {},
          axisLegend: that.data.axisLegend || [],
        })
      })
      .then(function () {
        wx.showToast({ title: '已保存到相册', icon: 'success' })
      })
      .catch(function (err) {
        console.error(err)
        wx.showToast({ title: '保存失败', icon: 'none' })
      })
      .then(function () {
        wx.hideLoading()
        that.setData({ sharing: false })
      })
  },
})
