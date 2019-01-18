// pages/me/me.js
const app = getApp()
const util = require("../../utils/util.js")
Page({
  data: {
    audioBaseUrl: app.baseUrl + "download/get",
    id: "",
    filename: ""
  },
  onLoad: function (options) {
    this.setData({
      id: options.id,
      filename: options.filename
    })
  }
})