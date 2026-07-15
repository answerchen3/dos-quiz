App({
  onLaunch: function () {
    this.globalData = {
      env: 'cloud1-d5gw2jt7af9f83de9',
    }
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
      return
    }
    wx.cloud.init({
      env: this.globalData.env,
      traceUser: true,
    })
  },
})
