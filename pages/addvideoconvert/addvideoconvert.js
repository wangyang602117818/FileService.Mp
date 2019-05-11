const app = getApp()
const util = require("../../utils/util.js")
Page({
  data: {
    flag: "",
    format: 0,
    quality: 0,
    formatItems: ['M3u8'],
    videoQualityItems: ['原画', '稍低', '中等','差'],
    index: null
  },
  flagChange: function (e) {
    this.setData({
      flag: e.detail.value
    });
  },
  showQualityModel: function (e) {
    wx.showActionSheet({
      itemList: this.data.videoQualityItems,
      success: function (res) {
        this.setData({
          quality: res.tapIndex
        });
      }.bind(this)
    })
  },
  ok: function (e) {
    if (util.trim(this.data.flag) == "") {
      return util.toast("标识不能为空")
    }
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    var obj = {
      flag: this.data.flag,
      format: this.data.format,
      quality: this.data.quality
    };
    if (this.data.index == null) {
      prevPage.data.converts.push(obj);
    } else {
      prevPage.data.converts[this.data.index] = obj;
    }
    prevPage.setData({
      converts: prevPage.data.converts
    });
    wx.navigateBack({
      delta: 1
    })
  },
  onLoad: function (options) {
    if (options.index >= 0) {
      wx.setNavigationBarTitle({
        title: '修改转换'
      });
      this.setData({
        index: options.index
      });
    } else {
      wx.setNavigationBarTitle({
        title: '添加转换'
      })
      this.setData({
        index: null
      });
    }
    this.setData({
      flag: options.flag || "",
      format: options.format || 0,
      quality: options.quality || 0
    })

  }
})