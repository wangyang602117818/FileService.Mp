const app = getApp()
const util = require("../../utils/util.js")
Page({
  data: {
    userName: "",
    passWord: ""
  },
  bindUserNameInput: function(e) {
    this.setData({
      userName: e.detail.value
    })
  },
  bindPassWordInput: function(e) {
    this.setData({
      passWord: e.detail.value
    })
  },
  login: function(e) {
    var userName = this.data.userName;
    var passWord = this.data.passWord;
    if (util.trim(userName) == "") return util.toast("UserName Required");
    if (util.trim(passWord) == "") return util.toast("PassWord Required");
    wx.login({
      success:res=>{
        app.post(app.baseUrl + "home/login", {
          userName: userName,
          passWord: passWord,
          authCode:app.authCode,
          apiType: app.apiType,
          code: res.code
        }, function (result) {
          if (result.code == 0) {
            app.token = result.result;
            wx.switchTab({
              url: '/pages/index/index',
            })
          } else {
            util.toast("Invalid UserName Or PassWord");
          }
        },true);
      }
    })
  }
})