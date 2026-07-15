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

const characters = require('../../utils/characters-data')
const questions = require('../../utils/questions-data')
const axesMeta = require('../../utils/axes-data')

const MARKS = ['A', 'B', 'C', 'D']

function pad2(n) {
  return n < 10 ? '0' + n : String(n)
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
    axisLegend: [],
    matchPercent: 0,
    comicAvailable: false,
    comicTitle: '',
    shadowName: '',
    shadowTagline: '',
    shadowSummary: '',
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

  onStart() {
    this.answers = Array(questions.length).fill(null)
    this.primary = null
    this.shadow = null
    this.userAxes = null
    this.comicPack = null
    this.setData({
      view: 'quiz',
      index: 0,
      locking: false,
      comicVisible: false,
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
        wx.pageScrollTo({ scrollTop: 0, duration: 200 })
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
    this.renderResult()
    this.setData({ view: 'result' })
    wx.pageScrollTo({ scrollTop: 0, duration: 200 })
    var that = this
    setTimeout(function () {
      that.drawRadar()
    }, 80)
  },

  renderResult() {
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
      axisLegend: buildAxisLegend(axes, axesMeta.axisHints || {}),
      matchPercent: similarityPercent(primary.score),
      comicAvailable: !!(comic && comic.pages && comic.pages.length),
      comicTitle: comic ? '用漫画看懂《' + comic.bookTitle + '》' : '',
      shadowName: shadow.name,
      shadowTagline: shadow.epithet
        ? shadow.epithet + ' · ' + shadow.tagline
        : shadow.tagline,
      shadowSummary: shadow.summary,
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
