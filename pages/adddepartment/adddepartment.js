const app = getApp()
const util = require("../../utils/util.js")
Page({
  data: {
    companyCode: "",
    companyName: "",
    departments: [],
    departmentsSelected: [],
    index: null
  },
  ok: function() {
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
  selectItem: function(e) {
    var code = e.currentTarget.dataset.code;
    if (this.data.departmentsSelected.indexOf(code) == -1) {
      this.data.departmentsSelected.push(code);
    } else {
      for (var i = 0; i < this.data.departmentsSelected.length; i++) {
        if (this.data.departmentsSelected[i] == code) {
          this.data.departmentsSelected.splice(i, 1);
          break;
        }
      }
    }
    this.checkSelected();
    this.setData({
      departments: this.data.departments,
      departmentsSelected: this.data.departmentsSelected
    });
  },
  checkSelected(){
    for (var k = 0; k < this.data.departments.length; k++) {
      if (this.data.departmentsSelected.indexOf(this.data.departments[k].DepartmentCode) > -1) {
        this.data.departments[k].selected = true;
      } else {
        this.data.departments[k].selected = false;
      }
    }
  },
  onLoad: function(options) {
    app.get(app.baseUrl + "department/getdepartment?code=" + options.code, {}, function(res) {
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
            title: '修改部门'
          });
          this.setData({
            index: options.index
          });
        } else {
          wx.setNavigationBarTitle({
            title: '添加部门'
          })
          this.setData({
            index: null
          });
        }
      }
    }.bind(this));
  }
})