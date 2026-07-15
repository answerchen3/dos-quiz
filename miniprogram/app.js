App({
  onLaunch: function () {
    this.globalData = {
      // 环境 ID：云开发控制台顶部可见。仅一个环境时可留空，走默认环境。
      env: '',
    }
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
      return
    }
    var init = { traceUser: true }
    if (this.globalData.env) {
      init.env = this.globalData.env
    }
    wx.cloud.init(init)
  },
})
