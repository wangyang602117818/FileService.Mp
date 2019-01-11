const app = getApp()
const util = require("../../utils/util.js")

Page({
  data: {
    pageIndex: 1,
    pageSize: 20,
    filter: "",
    count: 0,
    showLoading: false,
    end: false,
    result: []
  },
  onLoad: function() {
    this.data.pageIndex = 1;
    this.getData(false, null, true);
  },
  deleteAllCacheFile: function(e) {
    var that=this;
    wx.showModal({
      title: '清空',
      content: '清空缓存?',
      success(res) {
        if (res.confirm) {
          app.get(app.baseUrl + "task/deleteallcachefile", {}, function (data) {
            if (data.code == 0) {
              util.toast("清空缓存" + data.result);
              that.getData(false, null, true);
            }
          })
        }
      }
    });
  },
  redo: function(e) {
    var id = e.currentTarget.dataset.id;
    var type = e.currentTarget.dataset.type;
    var that = this;
    wx.showModal({
      title: '重做',
      content: '重新执行任务?',
      success(res) {
        if (res.confirm) {
          app.get(app.baseUrl + "task/redo/" + id + "?type=" + type, {}, function(data) {
            if (data.code == 0) {
              that.getData(false, null, true);
            } else {
              util.toast(data.message);
            }
          })
        } else if (res.cancel) {}
      }
    })
  },
  search: function(e) {
    this.data.pageIndex = 1;
    this.setData({
      end: false
    });
    var value = e.detail.value;
    this.setData({
      filter: value
    }, function() {
      this.getData(false, null, true);
    }.bind(this));
  },
  getData: function(append, callback, loading) {
    var url = app.baseUrl + "task/gettasks?" + "pageIndex=" + this.data.pageIndex + "&pageSize=" + this.data.pageSize + "&filter=" + this.data.filter;
    app.get(url, {}, function(data) {
      if (data.code == 0) {
        //util.setKeyWord(data, this.data.filter);
        if (this.data.pageIndex * this.data.pageSize > data.count) {
          this.setData({
            end: true
          })
        }
        if (append) {
          this.data.result = this.data.result.concat(data.result);
        } else {
          this.data.result = data.result;
        }
        this.setData({
          result: this.data.result,
          count: data.count
        });
      } else {
        util.toast(data.message);
      }
      if (callback) callback();
    }.bind(this), loading)
  },
  onPullDownRefresh: function() {
    this.data.pageIndex = 1;
    this.setData({
      end: false,
      showBottomFun: false
    });
    this.getData(false, function() {
      wx.stopPullDownRefresh();
    }, true);
  },
  onReachBottom: function() {
    this.setData({
      showLoading: true
    });
    if (!this.data.end) {
      this.data.pageIndex = this.data.pageIndex + 1;
      this.getData(true);
    }
  }
})