App({
  onLaunch: function () {
    this.globalData = {
      env: 'cloud1-d5gw2jt7af9f83de9',
    }
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
      return
    }
    // 无运营访问日志需求：关闭 traceUser，减少不必要用户标识上报
    wx.cloud.init({
      env: this.globalData.env,
      traceUser: false,
    })
  },
})
