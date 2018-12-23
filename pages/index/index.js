//index.js
//获取应用实例
const app = getApp()
const util = require("../../utils/util.js")
Page({
  data: {
    getFileIcon: app.baseUrl + "files/getfileicon",
    token: app.token,
    pageIndex: 1,
    pageSize: 15,
    filter: "",
    orderField: "CreateTime",
    orderFieldType: "desc",
    count: 0,
    showLoading:false,
    showOrder: false,
    showAdd: false,
    end: false,
    result: []
  },
  con_tap(e) {
    if (this.data.showOrder) this.setData({ showOrder: false });
    if (this.data.showAdd) this.setData({ showAdd: false });
  },
  addimage(e){

  },
  showOrder(e) {
    this.setData({
      showOrder: !this.data.showOrder,
      showAdd:false
    })
  },
  showAdd(e){
    this.setData({
      showAdd: !this.data.showAdd,
      showOrder:false
    })
  },
  changOrder(e) {
    this.data.pageIndex = 1;
    this.setData({end:false});
    var field = e.target.id;
    if (field) {
      this.setData({
        orderField: field,
        orderFieldType: this.data.orderFieldType == "desc" ? "asc" : "desc"
      })
    }
    this.getData(false, null, true);
  },
  onLoad: function () {
    this.data.pageIndex = 1;
    this.getData(false, null, true);
  },
  search: function (e) {
    this.data.pageIndex = 1;
    this.setData({ end: false });
    var value = e.detail.value;
    this.setData({
      filter: value
    }, function () {
      this.getData(false, null, true);
    }.bind(this));
  },
  getData: function (append, callback, loading) {
    var url = app.baseUrl + "files/getfiles?" + "pageIndex=" + this.data.pageIndex + "&pageSize=" + this.data.pageSize + "&filter=" + this.data.filter;
    if (this.data.orderField) url = url + "&orderField=" + this.data.orderField;
    if (this.data.orderFieldType) url = url + "&orderFieldType=" + this.data.orderFieldType;
    app.get(url, {}, function (data) {
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
        wx.showToast({
          title: data.message,
          icon: "none"
        });
      }
      if (callback) callback();
    }.bind(this), loading)
  },
  onPullDownRefresh: function () {
    this.data.pageIndex = 1;
    this.setData({ end: false });
    this.getData(false, function () {
      wx.stopPullDownRefresh();
    }, true);
  },
  onReachBottom: function () {
    this.setData({ showLoading: true});
    if (!this.data.end) {
      this.data.pageIndex = this.data.pageIndex + 1;
      this.getData(true);
    }
  }
})