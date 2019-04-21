const app = getApp()
const util = require("../../utils/util.js")
Page({
  data: {
    companyCode: "",
    companyName: "",
    users: [],
    userSelected: [],
    index: null
  },
  ok: function () {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    var obj = {
      companyCode: this.data.companyCode,
      companyName: this.data.companyName,
      accessUsers: this.data.userSelected
    };
    if (this.data.index == null) {
      prevPage.data.accessUsers.push(obj);
    } else {
      prevPage.data.accessUsers[this.data.index] = obj;
    }
    prevPage.setData({
      accessUsers: prevPage.data.accessUsers
    });
    wx.navigateBack({
      delta: 1
    })
  },
  selectItem: function (e) {
    var code = e.currentTarget.dataset.code;
    if (this.data.userSelected.indexOf(code) == -1) {
      this.data.userSelected.push(code);
    } else {
      for (var i = 0; i < this.data.userSelected.length; i++) {
        if (this.data.userSelected[i] == code) {
          this.data.userSelected.splice(i, 1);
          break;
        }
      }
    }
    this.checkSelected();
    this.setData({
      users: this.data.users,
      userSelected: this.data.userSelected
    });
  },
  checkSelected() {
    for (var k = 0; k < this.data.users.length; k++) {
      if (this.data.userSelected.indexOf(this.data.users[k].UserCode) > -1) {
        this.data.users[k].selected = true;
      } else {
        this.data.users[k].selected = false;
      }
    }
  },
  onLoad: function (options) {
    app.get(app.baseUrl + "user/getusers?company=" + options.code, {}, function (res) {
      if (res.code == 0) {
        this.data.userSelected = JSON.parse(options.userSelected);
        this.data.users = res.result;
        this.checkSelected();
        this.setData({
          companyCode: options.code,
          companyName: options.name,
          users: this.data.users,
          userSelected: this.data.userSelected
        });
        if (options.index >= 0) {
          wx.setNavigationBarTitle({
            title: '修改人员'
          });
          this.setData({
            index: options.index
          });
        } else {
          wx.setNavigationBarTitle({
            title: '添加人员'
          })
          this.setData({
            index: null
          });
        }
      }
    }.bind(this));
  }
})