// pages/me/me.js
const app = getApp()
const util = require("../../utils/util.js")
Page({
  data: {
    userId: "",
    userName: "",
    role: "",
    createTime: "",
    company: "",
    department: "",
    recyleCount: 0,
    logCount: 0,
    extensionCount: 0,
    applicationCount: 0,
    userCount: 0,
    companyCount: 0
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
    var userName = base64.match(/\"http:\/\/schemas.xmlsoap.org\/ws\/2005\/05\/identity\/claims\/name":"(.+?)"/i)[1];
    var role = base64.match(/\"http:\/\/schemas.microsoft.com\/ws\/2008\/06\/identity\/claims\/role":"(.+?)"/i)[1];
    var userId = base64.match(/"UserId":"(.+?)"/i)[1];
    var that = this;
    that.setData({
      userName: userName,
      role: role,
      userId: userId,
    }, function() {
      app.get(app.baseUrl + "home/getuser/" + userId, {}, function(res) {
        if (res.code == 0) {
          that.setData({
            company: res.result.CompanyDisplay,
            department: res.result.DepartmentDisplay,
            createTime: util.parseBsonTime(res.result.CreateTime)
          })
        }
      });
      app.get(app.baseUrl + "home/getcount/", {}, function(res) {
        if(res.code==0){
          that.setData({
            recyleCount: res.result.recyle,
            logCount: res.result.log,
            extensionCount: res.result.extension,
            applicationCount: res.result.application,
            userCount: res.result.user,
            companyCount: res.result.company
          })
        }
      });
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