// pages/me/me.js
const app = getApp()
const util = require("../../utils/util.js")
Page({
  data: {
    userName:"",
    role:"",
    createTime:""
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
    var res = app.token.match(/\.(\w+)\./i)[1];
    var base64 = util.base64Decode(res);
    console.log(base64);
    this.setData({
      userName: base64.match(/\"http:\/\/schemas.xmlsoap.org\/ws\/2005\/05\/identity\/claims\/name":"(\w+)"/i)[1],
      role: base64.match(/\"http:\/\/schemas.microsoft.com\/ws\/2008\/06\/identity\/claims\/role":"(\w+)"/i)[1],
      createTime: base64.match(/"CreateTime":"(.+?)"/i)[1],
    })
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