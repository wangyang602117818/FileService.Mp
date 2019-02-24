const app = getApp()
Page({
  data: {
    imageUrls: [],
    longPressIndex: 0
  },
  previewFile: function(e) {
    var url = e.currentTarget.dataset.url;
    wx.previewImage({
      current:url,
      urls: this.data.imageUrls
    })
  },
  longPress(e) {
    var url = e.currentTarget.dataset.url;
    for (var i = 0; i < this.data.imageUrls.length; i++) {
      if (this.data.imageUrls[i] == url) {
        var longPressIndex = i + 1;
        this.setData({
          longPressIndex: longPressIndex
        });
        break;
      }
    }
  },
  removeItem:function(e){
    var id = e.currentTarget.dataset.id;
    this.data.imageUrls.splice(id,1);
    this.setData({ imageUrls: this.data.imageUrls, longPressIndex:0})
  },
  chooseImage: function() {
    var that = this;
    wx.chooseImage({
      success: function(res) {
        that.setData({
          imageUrls: res.tempFilePaths
        })
      },
    })
  },
  onLoad: function() {

  }
})