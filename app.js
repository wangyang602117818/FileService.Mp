//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res);
        this.get(this.baseUrl + "home/weChatLogin", { code: res.code}, function(result) {
          console.log(result);
        });
      }
    })
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
  post: function(url, data, success, loading) {
    if (loading) wx.showLoading({
      title: "loading"
    });
    wx.request({
      url: url,
      method: "post",
      data: data,
      header: {
        'Authorization': this.token // 默认值
      },
      success: res => {
        success(res.data);
      },
      complete: () => {
        if (loading) wx.hideLoading();
      }
    })
  },
  get: function(url, data, success, loading) {
    if (loading) wx.showLoading({
      title: "loading"
    });
    wx.request({
      url: url,
      method: "get",
      data: data,
      header: {
        'Authorization': this.token // 默认值
      },
      success: res => {
        success(res.data);
      },
      complete: () => {
        if (loading) wx.hideLoading();
      }
    })
  },
  baseUrl: "http://127.0.0.1:5000/api/",
  appName:"MiniProgram",
  apiType:"none",
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoid2FuZyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6ImFkbWluIiwiZXhwIjoxNTQ2MDk5MTk5LCJpc3MiOiJodHRwOi8vMTI3LjAuMC4xLyIsImF1ZCI6Imh0dHA6Ly8xMjcuMC4wLjEvIn0.-dzX2DwRXm4PyTlvQ5UQdWRvigSmnxk9IKmzNTl-0Rg",
  funs: require('./utils/util.js'),
  globalData: {
    userInfo: null,

  }
})