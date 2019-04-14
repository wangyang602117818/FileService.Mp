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
    console.log(this.data.departmentsSelected);
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    var obj = {
      companyCode: this.data.companyCode,
      companyName: this.data.companyName,
      accessCodes: this.data.departmentsSelected
    };
    if (this.data.index == null) {
      prevPage.data.accessDepartments.push(obj);
    } else {
      prevPage.data.accessDepartments[this.data.index] = obj;
    }
    prevPage.setData({
      accessDepartments: prevPage.data.accessDepartments
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
      if (this.data.userSelected.indexOf(this.data.users[k].DepartmentCode) > -1) {
        this.data.users[k].selected = true;
      } else {
        this.data.users[k].selected = false;
      }
    }
  },
  onLoad: function (options) {
    app.get(app.baseUrl + "department/getdepartment?code=" + options.code, {}, function (res) {
      if (res.code == 0) {
        this.data.departmentsSelected = JSON.parse(options.departmentsSelected);
        this.data.departments = res.result;
        this.checkSelected();
        this.setData({
          companyCode: options.code,
          companyName: options.name,
          departments: this.data.departments,
          departmentsSelected: this.data.departmentsSelected
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