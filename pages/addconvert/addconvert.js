const app = getApp()
const util = require("../../utils/util.js")
Page({
  data: {
    flag: "",
    format: 0,
    model: 0,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    imageQuality: 0,
    formatItems: ['默认', 'Jpeg', 'Png', "Gif", "Bmp"],
    modelItems: ['缩放', '剪切', '按宽度', '按高度'],
    imageQualityItems: ['高', '中', '低'],
    maxWidth: 0,
    maxHeight: 0
  },
  flagChange: function(e) {
    this.setData({
      flag: e.detail.value
    });
  },
  sliderChangeTop: function(e) {
    this.setData({
      y: e.detail.value
    });
  },
  sliderChangeLeft: function(e) {
    this.setData({
      x: e.detail.value
    });
  },
  sliderChangeWidth: function(e) {
    this.setData({
      width: e.detail.value
    });
  },
  sliderChangeHeight: function(e) {
    this.setData({
      height: e.detail.value
    });
  },
  showOutputFormat: function(e) {
    wx.showActionSheet({
      itemList: this.data.formatItems,
      success: function(res) {
        this.setData({
          format: res.tapIndex
        });
      }.bind(this)
    })
  },
  showConvertModel: function(e) {
    wx.showActionSheet({
      itemList: this.data.modelItems,
      success: function(res) {
        this.setData({
          model: res.tapIndex
        });
      }.bind(this)
    })
  },
  showQualityModel: function(e) {
    wx.showActionSheet({
      itemList: this.data.imageQualityItems,
      success: function(res) {
        this.setData({
          imageQuality: res.tapIndex
        });
      }.bind(this)
    })
  },
  ok: function(e) {
    if (util.trim(this.data.flag) == "") {
      return util.toast("标识不能为空")
    }
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.data.converts.push({
      flag: this.data.flag,
      format: this.data.format,
      model: this.data.model,
      x: this.data.x,
      y: this.data.y,
      width: this.data.width,
      height: this.data.height,
      imageQuality: this.data.imageQuality
    });
    prevPage.setData({
      converts: prevPage.data.converts
    });
    wx.navigateBack({
      delta: 1
    })
  },
  onLoad: function(options) {
    options.index >= 0 ? wx.setNavigationBarTitle({
      title: '修改转换'
    }) : wx.setNavigationBarTitle({
      title: '添加转换'
    })

    this.setData({
      maxWidth: options.maxWidth || 0,
      maxHeight: options.maxHeight || 0,

    })

  }
})