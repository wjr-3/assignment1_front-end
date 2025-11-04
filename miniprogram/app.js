
// app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'ee308-1-9g6uoxua26388d4a', 
        traceUser: true,
      })
    }
    
    this.globalData = {
      db: wx.cloud.database(),
      collectionName: 'contacts'
    }
  }
})