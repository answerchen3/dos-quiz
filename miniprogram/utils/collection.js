/**
 * 陀氏图鉴 · 本地持久收集
 * 页面请只通过本模块读写，勿直接调用 wx.setStorage。
 *
 * 上云预留：exportForSync / importFromSync
 * 二期云函数名预留：syncCollection
 * 合并策略：按 characterId union；firstAt 取更早；lastAt 取更晚；sources 集合并
 */

var STORAGE_KEY = 'dos.collection.v1'

function emptyState() {
  return {
    version: 1,
    unlocked: {},
    lastResult: null,
  }
}

function getState() {
  try {
    var raw = wx.getStorageSync(STORAGE_KEY)
    if (!raw || typeof raw !== 'object') return emptyState()
    if (!raw.unlocked || typeof raw.unlocked !== 'object') {
      raw.unlocked = {}
    }
    if (raw.version == null) raw.version = 1
    return raw
  } catch (e) {
    console.error('[collection] getState failed', e)
    return emptyState()
  }
}

function saveState(state) {
  try {
    wx.setStorageSync(STORAGE_KEY, state)
    return true
  } catch (e) {
    console.error('[collection] saveState failed', e)
    return false
  }
}

function mergeSources(existing, incoming) {
  var map = {}
  ;(existing || []).forEach(function (s) {
    if (s) map[s] = true
  })
  ;(incoming || []).forEach(function (s) {
    if (s) map[s] = true
  })
  return Object.keys(map)
}

/**
 * @param {string|string[]} idOrIds
 * @param {{ sources?: string[] }} [meta]
 * @returns {{ ok: boolean, newlyUnlocked: string[] }}
 */
function unlock(idOrIds, meta) {
  var ids = Array.isArray(idOrIds) ? idOrIds : [idOrIds]
  var sources = (meta && meta.sources) || []
  var state = getState()
  var now = Date.now()
  var newlyUnlocked = []

  ids.forEach(function (id) {
    if (!id || typeof id !== 'string') return
    var prev = state.unlocked[id]
    if (!prev) {
      state.unlocked[id] = {
        firstAt: now,
        lastAt: now,
        sources: mergeSources([], sources),
      }
      newlyUnlocked.push(id)
      return
    }
    prev.lastAt = now
    prev.sources = mergeSources(prev.sources, sources)
    state.unlocked[id] = prev
  })

  var ok = saveState(state)
  return { ok: ok, newlyUnlocked: newlyUnlocked }
}

function setLastResult(primaryId, shadowId) {
  var state = getState()
  state.lastResult = {
    primaryId: primaryId || '',
    shadowId: shadowId || '',
    at: Date.now(),
  }
  return saveState(state)
}

/**
 * 从候选里随机抽一张（优先未解锁）
 * @param {string[]} preferIds 本场闪卡遇见
 * @param {string} excludeId 排除（通常是主人格，已单独入册）
 * @param {string[]} [allIds] 全角色 id，作后备池
 */
function pickRandomDropId(preferIds, excludeId, allIds) {
  var unlocked = getState().unlocked || {}
  var seen = {}

  function collect(list, onlyLocked) {
    var out = []
    ;(list || []).forEach(function (id) {
      if (!id || id === excludeId || seen[id]) return
      if (onlyLocked && unlocked[id]) return
      seen[id] = true
      out.push(id)
    })
    return out
  }

  var pool = collect(preferIds, true)
  if (!pool.length) pool = collect(allIds, true)
  if (!pool.length) {
    seen = {}
    pool = collect(preferIds, false)
  }
  if (!pool.length) {
    seen = {}
    pool = collect(allIds, false)
  }
  if (!pool.length) return null
  return pool[Math.floor(Math.random() * pool.length)]
}

/**
 * 一次测验结束：主人格入册 + 随机掉落 1 张（不再全量解锁闪卡/暗影）
 * @returns {{ ok: boolean, newlyUnlocked: string[], dropId: string|null, primaryId: string }}
 */
function recordQuizUnlocks(options) {
  var flashIds = (options && options.flashIds) || []
  var primaryId = options && options.primaryId
  var shadowId = options && options.shadowId
  var allIds = (options && options.allIds) || []
  var beforeIds = {}
  Object.keys(getState().unlocked || {}).forEach(function (id) {
    beforeIds[id] = true
  })
  var ok = true

  function track(result) {
    if (!result.ok) ok = false
  }

  if (primaryId) track(unlock(primaryId, { sources: ['primary'] }))

  var dropId = pickRandomDropId(flashIds, primaryId, allIds)
  if (dropId) track(unlock(dropId, { sources: ['drop'] }))

  if (primaryId || shadowId) {
    if (!setLastResult(primaryId, shadowId)) ok = false
  }

  var newlyUnlocked = []
  Object.keys(getState().unlocked || {}).forEach(function (id) {
    if (!beforeIds[id]) newlyUnlocked.push(id)
  })

  return {
    ok: ok,
    newlyUnlocked: newlyUnlocked,
    dropId: dropId,
    primaryId: primaryId || null,
  }
}

function getProgress(total) {
  var state = getState()
  var unlocked = Object.keys(state.unlocked || {}).length
  return {
    unlocked: unlocked,
    total: typeof total === 'number' ? total : unlocked,
  }
}

/**
 * @param {Array} characters
 * @param {{ characterImage?: Function }} [helpers]
 */
function listForGallery(characters, helpers) {
  var state = getState()
  var unlockedMap = state.unlocked || {}
  var imageFn = (helpers && helpers.characterImage) || function () {
    return ''
  }

  return (characters || []).map(function (c) {
    var entry = unlockedMap[c.id]
    var isUnlocked = !!entry
    if (isUnlocked) {
      return {
        id: c.id,
        unlocked: true,
        name: c.name,
        epithet: c.epithet || '',
        tagline: c.tagline || '',
        summary: c.summary || '',
        image: imageFn(c),
        hidden: !!c.hidden,
      }
    }
    return {
      id: c.id,
      unlocked: false,
      name: '',
      epithet: '',
      tagline: '',
      summary: '',
      image: '',
      hidden: !!c.hidden,
    }
  })
}

function isUnlocked(id) {
  var state = getState()
  return !!(state.unlocked && state.unlocked[id])
}

function exportForSync() {
  return getState()
}

/**
 * 本地合并导入（上云回写时用同一策略）
 * 二期可接云函数 syncCollection
 */
function importFromSync(payload) {
  if (!payload || typeof payload !== 'object') {
    return { ok: false }
  }
  var local = getState()
  var remoteUnlocked = payload.unlocked || {}
  Object.keys(remoteUnlocked).forEach(function (id) {
    var remote = remoteUnlocked[id]
    if (!remote) return
    var cur = local.unlocked[id]
    if (!cur) {
      local.unlocked[id] = {
        firstAt: remote.firstAt || Date.now(),
        lastAt: remote.lastAt || Date.now(),
        sources: mergeSources([], remote.sources || []),
      }
      return
    }
    cur.firstAt = Math.min(cur.firstAt || Infinity, remote.firstAt || Infinity)
    cur.lastAt = Math.max(cur.lastAt || 0, remote.lastAt || 0)
    cur.sources = mergeSources(cur.sources, remote.sources || [])
    local.unlocked[id] = cur
  })

  if (payload.lastResult && payload.lastResult.at) {
    if (!local.lastResult || payload.lastResult.at > (local.lastResult.at || 0)) {
      local.lastResult = payload.lastResult
    }
  }

  return { ok: saveState(local) }
}

/**
 * 会话遇见列表去重保序
 */
function appendSessionMet(list, characterId) {
  if (!characterId) return list || []
  var next = (list || []).slice()
  if (next.indexOf(characterId) === -1) next.push(characterId)
  return next
}

module.exports = {
  STORAGE_KEY: STORAGE_KEY,
  getState: getState,
  unlock: unlock,
  setLastResult: setLastResult,
  pickRandomDropId: pickRandomDropId,
  recordQuizUnlocks: recordQuizUnlocks,
  getProgress: getProgress,
  listForGallery: listForGallery,
  isUnlocked: isUnlocked,
  exportForSync: exportForSync,
  importFromSync: importFromSync,
  appendSessionMet: appendSessionMet,
}
