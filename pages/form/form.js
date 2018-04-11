// pages/form/form.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowMedicalCard: false,
    bloodTypes: ['A','B','AB','O','RH+','RH-','Hh孟买血型','亚孟买血型','P血型'],
    index: 0,
    medicalConditions: [
      {name: '有过敏史',checked:false},
      {name: '有过大型手术',checked:false},
      {name: '有家族遗传病',checked:false}
    ],
    phoneNumber: '',
    isShowUpdate: false,
    form: null
  },
  phoneNUmberChange: function(e) {
    let phone = e.detail.value
    this.setData({
      phoneNumber: phone
    })
  },
  makePhoneCall: function(){
    let {phoneNumber} = this.data
    wx.makePhoneCall({
      phonenUmber: phoneNumber
    })
  },
  bloodTypeChange: function (e) {
    let value = e.detail.value
    this.setData({
      index: value
    })
  },
  showMedicalCard: function(){
    this.setData({
      isShowMedicalCard: true
    })
  },
  formSubmit: function(e) {
    let val = e.detail.value
    let tableID = 4066
    let Product = new wx.BaaS.TableObject(tableID)
    if(this.data.form!==null) {
      example(val).then(res => {
        wx.showToast({
          title: '更新成功'
        })
      }), err => {
        wx.showToast({
          title: '更新失败'
        })
      }
    }
    return
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let medical = this.data.medicalConditions
    example().then(res => {
      let obj =  res.data.objects
      if (obj) {
        let medical = this.data.medicalConditions
        for (let i = 0; i < medical.length; i++) {
          if (obj.medicalConditions.includes(medical[i].name)) {
            medical[i].checked = true
            this.setData({
              medicalConditions: medical
            })
          }
        }
        this.setData({
          index: obj.bloodType,
          isShowMedicalCard: true,
          form: {...obj},
          isShowUpdate: true
        })
      }
    }, err => {
      wx.showToast({
        title: '获取数据出错'
      })
    })
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