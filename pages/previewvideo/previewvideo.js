// pages/me/me.js
const app = getApp()
const util = require("../../utils/util.js")
Page({
  data: {
    videoBaseUrl: app.baseUrl +"download/m3u8multistream",
    id:"",
    filename:""
  },
  onLoad: function (options){
    this.setData({
      id: options.id,
      filename: options.filename
    })
  }
})