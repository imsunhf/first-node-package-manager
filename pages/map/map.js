// pages/map/map.js
var QQMapWX = require('../../static/js/qqmap-wx-jssdk.min.js')
var demo = new QQMapWX({
  key: '7LWBZ-CLU66-WV6SP-E7TYO-SQU37-46BAH'
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasLocation: false,
    location: '',
    demo: demo,
    QQMapWX: QQMapWX,
    longitude: '',
    latitude:'',
    address: '',
    markers: [{
      id: 1,
      longitude: '',
      latitude:'',
      iconPath: '/static/image/ooopic_1523436474.png',
      width: 50,
      height: 50
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _this = this
    wx.getLocation({
      success: function(res) {
        console.log(res)
        // formatLocation(res.longitude, res.latitude)
        _this.setData({
          hasLocation: true,
          longitude: res.longitude,
          latitude: res.latitude,
          location: formatLocation(res.longitude, res.latitude),
          address: '定位中',
          markers: [{
            id: 1,
            longitude: res.longitude,
            latitude:res.latitude,
            iconPath: '/static/image/ooopic_1523436474.png',
            width: 30,
            height: 30,
            title: "I'm here",
            callout:{
              content: '我在这里',
              color: '#f00',
              fontSize: 16
            }
          }]
        })
      }
    })
    function formatLocation(longitude, latitude) {
      demo.reverseGeocoder({
        location: {
            latitude: latitude,
            longitude: longitude
        },
        success: function(res) {
            console.log(res);
            _this.setData({
              address: res.result.ad_info.name
            })
            return res
        },
        fail: function(res) {
            console.log(res);
        },
        complete: function(res) {
            console.log(res);
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})