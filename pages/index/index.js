//index.js
//获取应用实例
const app = getApp()
const util = require("../../utils/util.js")
Page({
  data: {
    getFileIconMobile: app.baseUrl + "files/getfileiconmobile",
    getFileIcon: app.baseUrl + "files/getfileicon",
    pageIndex: 1,
    pageSize: 20,
    filter: "",
    orderField: "CreateTime",
    orderFieldType: "desc",
    count: 0,
    showLoading: false,
    showOrder: false,
    showAdd: false,
    showBottomFun: false,
    end: false,
    listType: "thumb", //thumb
    selectedIds: [],
    arrayCount: 3,
    nestedResult: [],

    result: []
  },
  con_tap(e) {
    if (this.data.showOrder) this.setData({
      showOrder: false
    });
    if (this.data.showAdd) this.setData({
      showAdd: false
    });
  },
  changeList(e) {
    this.setData({
      listType: this.data.listType == "list" ? "thumb" : "list"
    });
  },
  funBack(e) {
    for (var i = 0; i < this.data.result.length; i++) {
      this.data.result[i].selected = false;
    }
    this.setData({
      result: this.data.result,
      showBottomFun: false,
      selectedIds: []
    }, function() {
      wx.showTabBar({});
    })
  },
  previewFile(e) {
    var id = e.currentTarget.dataset.id;
    var filename = e.currentTarget.dataset.filename;
    var url = app.baseUrl + "download/get/" + id;
    wx.downloadFile({
      url: url,
      header: {
        'Authorization': app.token
      },
      success(res) {
        var filePath = res.tempFilePath;
        wx.openDocument({
          filePath,
          success(res) {
            console.log('打开文档成功')
          }
        })
      }
    })
  },
  selectItem(e) {
    var id = e.currentTarget.dataset.id;
    for (var i = 0; i < this.data.result.length; i++) {
      if (this.data.result[i]._id.$oid == id) {
        this.data.result[i].selected = !this.data.result[i].selected;
      }
    }
    this.setData({
      result: this.data.result
    });
    var selectedIds = [];
    for (var i = 0; i < this.data.result.length; i++) {
      if (this.data.result[i].selected) selectedIds.push(this.data.result[i]._id.$oid);
    }
    if (selectedIds.length > 0) {
      wx.hideTabBar({
        success: function() {
          this.setData({
            showBottomFun: true,
            selectedIds: selectedIds
          });
        }.bind(this)
      });
    } else {
      this.setData({
        showBottomFun: false,
        selectedIds: selectedIds
      }, function() {
        wx.showTabBar({});
      });
    }
  },
  showOrder(e) {
    this.setData({
      showOrder: !this.data.showOrder,
      showAdd: false
    })
  },
  showAdd(e) {
    this.setData({
      showAdd: !this.data.showAdd,
      showOrder: false
    })
  },
  changOrder(e) {
    this.data.pageIndex = 1;
    this.setData({
      end: false
    });
    var field = e.target.id;
    if (field) {
      this.setData({
        orderField: field,
        orderFieldType: this.data.orderFieldType == "desc" ? "asc" : "desc"
      })
    }
    this.getData(false, null, true);
  },
  onLoad: function() {
    this.data.pageIndex = 1;
    this.getData(false, null, true);
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
    var url = app.baseUrl + "files/getfiles?" + "pageIndex=" + this.data.pageIndex + "&pageSize=" + this.data.pageSize + "&filter=" + this.data.filter;
    if (this.data.orderField) url = url + "&orderField=" + this.data.orderField;
    if (this.data.orderFieldType) url = url + "&orderFieldType=" + this.data.orderFieldType;
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
        }, function() {
          //另一种视图方式
          this.setData({
            nestedResult: util.reMapArray(this.data.result, this.data.arrayCount)
          });
        }.bind(this));
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
    }, function() {
      wx.showTabBar({});
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