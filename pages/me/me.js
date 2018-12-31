// pages/me/me.js
const app = getApp()
const util = require("../../utils/util.js")
Page({

  /**
   * Page initial data
   */
  data: {

  },
  logOut: e => {
    app.get(app.baseUrl + "home/logout", {}, function(result) {
      if (result.code == 0) {
        wx.redirectTo({
          url: '/pages/login/login',
        })
      } else {
        util.toast(result.message);
      }
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function() {

  }
})