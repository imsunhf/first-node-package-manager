App({
  globalData:{
    userInfo: null
  },
  onLaunch: function() {
    var _this = this
    wx.login({
      success: function(res) {
        if (res.code) {
          //发起网络请求
          wx.getUserInfo({
            success: function(res) {
              _this.globalData.userInfo = res.userInfo
              console.log(_this.globalData)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  }
})