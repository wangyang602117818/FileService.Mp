const app = getApp()
const util = require("../../utils/util.js")
Page({
  data: {
    departments: []
  },
  selectItem: function(e) {
    var index = e.currentTarget.dataset.key;
    for (var i = 0; i < this.data.departments.length; i++) {
      if (index == i) {
        this.data.departments[index].selected = !this.data.departments[index].selected;
      }
    }
    this.setData({ departments:this.data.departments});
  },
  onLoad: function(options) {
    app.get(app.baseUrl + "department/getdepartment?code=6d3744a3acf1", {}, function(res) {
      if (res.code == 0) {
        this.setData({
          departments: res.result,
        })
      }
    }.bind(this));
  }

})