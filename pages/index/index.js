// pages/index/index.js
const firstPage = [{
  id: '1',
  title: '装修秘诀',
  description: '文艺气息爆棚个的精致白色现代家',
  cover: '/image/2s.jpg'
}, {
  id: '2',
  title: '装修秘诀',
  description: '文艺气息爆棚个的精致白色现代家',
  cover: '/image/2s.jpg'
  }, {
    id: '3',
    title: '装修秘诀',
    description: '文艺气息爆棚个的精致白色现代家',
    cover: '/image/2s.jpg'
}, {
  id: '4',
  title: '装修秘诀',
  description: '文艺气息爆棚个的精致白色现代家',
  cover: '/image/2s.jpg'
}]

const lastPage = [{
  id: '5',
  title: '装修秘诀',
  description: '文艺气息爆棚个的精致白色现代家',
  cover: '/image/2s.jpg'
}, {
  id: '6',
  title: '装修秘诀',
  description: '文艺气息爆棚个的精致白色现代家',
  cover: '/image/2s.jpg'
}]

let isEnd = false
let pageLimit = 4
let READED_ARTICLES = 'READED_ARTICLES'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articles: [],
    loading: false,
    loadMoreText: '加载更多'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getArticles(true)
  },
  loadMore: function(event) {
    this.getArticles()
  },
  getArticles: function(isFirstPage){
    if (!isEnd && !this.data.loading) {
      this.setData({loading: true})
      setTimeout(() => {
        if(isFirstPage) {
          this.setData({
            articles: firstPage,
            loading: false
          })
        } else {
          this.setData({
            articles: firstPage.concat(this.addReadStatus(lastPage)),
            loading: false
          })
          if (lastPage.length <pageLimit) {
            isEnd = true
            this.setData({ loadMoreText: '已无更多' })
          }
        }
      })
    }
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
  onShareAppMessage: function (option) {
    return {
      title: this.data.article.title,
      imageUrl: this.data.article.poster,
      path: `pages/detail/index?id=${id}`
    }
  },
  toDetailPage: function(e) {
    let id = e.currentTarget.dataset.id
    let readedArticles = wx.getStorageSync(READED_ARTICLES)
    if(!readedArticles) {
      wx.setStorageSync(READED_ARTICLES,[id])
    } else if (readedArticles.indexOf(id) == -1) {
      readedArticles.push(id)
      wx.setStorageSync(READED_ARTICLES,readedArticles)
    }
    this.setData({articles: this.addReadStatus(this.data.articles)})
    wx.navigateTo({
      url: `../detail/detail?id=${id}`
    })
  },
  addReadStatus: function(articles) {
    let readedArticles = wx.getStorageSync(READED_ARTICLES)
    if(!readedArticles) {
      return articles
    }
    let newArticles = []
    for(let i = 0;i<articles.length;i++) {
      let article = Object.assign(articles[i])
      if(readedArticles.indexOf(article.id) != -1) {
        article.isReaded = true
      } else {
        article.isReaded = false
      }
      newArticles.push(article)
    }
    return newArticles
  }
})