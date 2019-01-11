const app = getApp()
const util = require("../../utils/util.js")
Page({
  data: {
    userName: "",
    role: "",
    password: "",
    password2: ""
  },
  newPassword: function(e) {
    this.setData({
      password: e.detail.value
    })
  },
  newPassword2: function(e) {
    this.setData({
      password2: e.detail.value
    })
  },
  changepwd: function(e) {
    if (util.trim(this.data.password) == "" || util.trim(this.data.password2) == "") {
      return util.toast("password required");
    }
    if (this.data.password != this.data.password2) {
      return util.toast("password not matched");
    }
    app.get(app.baseUrl + "home/changepassword?password=" + this.data.password, {}, function(res) {
      if (res.code == 0) {
        wx.redirectTo({
          url: '/pages/login/login'
        })
      } else {
        util.toast(res.message);
      }
    });
  },
  onLoad: function(options) {
    this.setData({
      userName: options.name,
      role: options.role
    })
  }
})