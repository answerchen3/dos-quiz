/**
 * 陀翁手帐 · 本地笔记存储
 *
 * 只通过本模块读写，页面勿直接调 wx.setStorage。
 * key: dos.readingNotes.v1
 * 数组元素：{ id, date, quoteText, quoteBook, noteText, bgCharacterId, createdAt, imagePath? }
 */
var STORAGE_KEY = 'dos.readingNotes.v1'

function emptyList() {
  return []
}

function getNotes() {
  try {
    var raw = wx.getStorageSync(STORAGE_KEY)
    if (!Array.isArray(raw)) return emptyList()
    return raw
  } catch (e) {
    console.error('[reading-notes] getNotes failed', e)
    return emptyList()
  }
}

function saveNotes(list) {
  try {
    wx.setStorageSync(STORAGE_KEY, list || [])
    return true
  } catch (e) {
    console.error('[reading-notes] saveNotes failed', e)
    return false
  }
}

function genId() {
  return 'n_' + Date.now().toString(36) + '_' + Math.floor(Math.random() * 1e6).toString(36)
}

/** 新增一条手帐，返回新条目 */
function addNote(payload) {
  if (!payload) return null
  var list = getNotes()
  var note = {
    id: payload.id || genId(),
    date: payload.date || '',
    quoteText: payload.quoteText || '',
    quoteBook: payload.quoteBook || '',
    noteText: payload.noteText || '',
    bgCharacterId: payload.bgCharacterId || '',
    createdAt: Date.now(),
    imagePath: payload.imagePath || '',
  }
  list.unshift(note)
  // 上限 200 条，避免 storage 爆
  if (list.length > 200) list = list.slice(0, 200)
  saveNotes(list)
  return note
}

function removeNote(id) {
  if (!id) return false
  var list = getNotes()
  var next = list.filter(function (n) { return n.id !== id })
  if (next.length === list.length) return false
  return saveNotes(next)
}

function getNoteById(id) {
  if (!id) return null
  var list = getNotes()
  for (var i = 0; i < list.length; i += 1) {
    if (list[i].id === id) return list[i]
  }
  return null
}

module.exports = {
  STORAGE_KEY: STORAGE_KEY,
  getNotes: getNotes,
  saveNotes: saveNotes,
  addNote: addNote,
  removeNote: removeNote,
  getNoteById: getNoteById,
  genId: genId,
}
