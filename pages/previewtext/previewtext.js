// pages/me/me.js
const app = getApp()
const util = require("../../utils/util.js")
Page({
  data: {
    id: "",
    filename: "",
    text:""
  },
  onLoad: function (options) {
    this.setData({
      id: options.id,
      filename: options.filename
    });
    app.get(app.baseUrl + "download/get/" + options.id,{},function(res){
      this.setData({ text: res});
    }.bind(this))
  }
})