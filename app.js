//app.js
const util = require("/utils/util.js")
App({
  onShow() {
    var pages = getCurrentPages();
    if (pages.length > 0) return;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (this.token.length > 0) {
          wx.switchTab({
            url: '/pages/index/index'
          })
        } else {
          this.post(this.baseUrl + "home/weChatLogin", {
            authCode: this.authCode,
            apiType: this.apiType,
            code: res.code
          }, function (result) {
            if (result.code == 0) {
              this.token = result.result;
              // wx.switchTab({
              //   url: '/pages/index/index'
              // })
              wx.navigateTo({
                url: '/pages/addimage/addimage',
              })
            }
          }.bind(this), true);
        }
      }
    })
  },
  onLaunch: function () {
    var pages = getCurrentPages();
    if (pages.length > 0) return;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              console.log(res);
              this.globalData.userInfo = res.userInfo;
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  getExtensions() {
    this.get(this.baseUrl + "files/getextensions", {}, function (result) {
      if (result.code == 0) this.extensions = result.result;
    }.bind(this));
  },
  post: function (url, data, success, loading) {
    if (loading) wx.showLoading({
      title: "loading",
      mask: true
    });
    wx.request({
      url: url,
      method: "post",
      data: data,
      header: {
        'Authorization': this.token
      },
      success: res => {
        success(res.data);
      },
      complete: () => {
        if (loading) wx.hideLoading();
      }
    })
  },
  postFiles: function (url, tempFilePaths, name, data, success, allcomplete) {
    var index = 0;
    for (var i = 0; i < tempFilePaths.length; i++) {
      var path = tempFilePaths[i];
      this.postFile(url, path, name, data, success, function () {
        index++;
        if (index == tempFilePaths.length) allcomplete();
      });
    }
  },
  postFile: function (url, filePath, name, data, success, complete) {
    wx.uploadFile({
      url: url,
      filePath: filePath,
      name: name,
      formData: data,
      header: {
        'Authorization': this.token
      },
      success(res) {
        const data = res.data
        success(data);
      },
      complete() {
        complete();
      }
    })
  },
  get: function (url, data, success, loading) {
    if (loading) wx.showLoading({
      title: "loading",
      mask: true
    });
    wx.request({
      url: url,
      method: "get",
      data: data,
      header: {
        'Authorization': this.token
      },
      success: res => {
        success(res.data);
      },
      complete: () => {
        if (loading) wx.hideLoading();
      }
    })
  },
  baseUrl: "http://192.168.1.103:5000/api/",
  authCode: "1936aef6d2ba",
  documentOffice: [".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".pdf"],
  documentWps: [".odg", ".ods", ".odp", ".odf", ".odt", ".wps", ".et", ".dps"],
  images: [".jpg", ".png", ".gif", ".bmp", ".jpeg", ".pic", ".ico", ".tif", ".svg"],
  videos: [".mp4", ".avi", ".wmv", ".mov", ".mkv", ".flv", ".rm", ".rmvb", ".m3u8"],
  audios: [".mp3"],
  text: [".txt", ".js", ".html", ".htm", ".css", ".json"],
  apiType: "none",
  token: "",
  extensions: [],
  funs: require('./utils/util.js'),
  globalData: {
    userInfo: null,

  }
})