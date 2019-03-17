const app = getApp()
Page({
  data: {
    imageUrls: [],
    converts: [],
    modelItems: ['缩放', '剪切', '按宽度', '按高度'],
    longPressIndex: 0
  },
  maxWidth: 0,
  maxHeight: 0,
  previewFile: function(e) {
    if (this.data.longPressIndex > 0) {
      this.setData({
        longPressIndex: 0
      });
      return;
    }
    var url = e.currentTarget.dataset.url;
    wx.previewImage({
      current: url,
      urls: this.data.imageUrls
    })
  },
  longPress(e) {
    var url = e.currentTarget.dataset.url;
    for (var i = 0; i < this.data.imageUrls.length; i++) {
      if (this.data.imageUrls[i].toString() == url.toString()) {
        var longPressIndex = i + 1;
        this.setData({
          longPressIndex: longPressIndex
        });
        break;
      }
    }
  },
  removeItem: function(e) {
    var id = e.currentTarget.dataset.id;
    this.data.imageUrls.splice(id, 1);
    this.setData({
      imageUrls: this.data.imageUrls,
      longPressIndex: 0
    }, function() {
      this.checkImageMax(this.data.imageUrls);
    }.bind(this))
  },
  chooseImage: function() {
    var that = this;
    wx.chooseImage({
      success: function(res) {
        res.tempFilePaths.forEach(function(value, index) {
          that.data.imageUrls.push(value);
        });
        that.setData({
          imageUrls: that.data.imageUrls
        });
        that.checkImageMax(that.data.imageUrls);
      },
    })
  },
  addConvert() {
    wx.navigateTo({
      url: "/pages/addconvert/addconvert?maxWidth=" + this.maxWidth + "&maxHeight=" + this.maxHeight
    })
  },
  updateConvert(e) {
    var index = e.currentTarget.dataset.key;
    var convert = this.data.converts[index];
    wx.navigateTo({
      url: "/pages/addconvert/addconvert?index=" + index + "&flag=" + convert.flag + "&format=" + convert.format + "&model=" + convert.model + "&x=" + convert.x + "&y=" + convert.y + "&width=" + convert.width + "&height=" + convert.height + "&imageQuality=" + convert.imageQuality
    })
  },
  checkImageMax(urls) {
    var that = this;
    that.maxWidth = 0;
    that.maxHeight = 0;
    for (var i = 0; i < urls.length; i++) {
      var url = urls[i];
      wx.getImageInfo({
        src: url,
        success: function(data) {
          if (data.width > that.maxWidth) that.maxWidth = data.width;
          if (data.height > that.maxHeight) that.maxHeight = data.height;
        }
      })
    }
  },
  onLoad: function() {

  }
})