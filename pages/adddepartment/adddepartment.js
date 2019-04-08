const app = getApp()
const util = require("../../utils/util.js")
Page({
  data: {
    companyCode:"",
    departments: [],
    departmentsSelected: []
  },
  ok: function() {

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
    for (var k = 0; k < this.data.departments.length; k++) {
      if (this.data.departmentsSelected.indexOf(this.data.departments[k].DepartmentCode) > -1) {
        this.data.departments[k].selected = true;
      } else {
        this.data.departments[k].selected = false;
      }
    }
    this.setData({
      departments: this.data.departments,
      departmentsSelected: this.data.departmentsSelected
    });
  },
  onLoad: function(options) {
    app.get(app.baseUrl + "department/getdepartment?code=" + options.code, {}, function(res) {
      if (res.code == 0) {
        this.setData({
          companyCode: options.code,
          departments: res.result,
        })
      }
    }.bind(this));
  }

})