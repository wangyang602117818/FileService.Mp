const app = getApp()
Page({
  data: {
    imageUrls: [],
    converts: [],
    departments: [],
    accessDepartments: [],
  //   {
  //   companyCode: "",
  //   companyName: "",
  //   accessCodes: []
  // }
    accessUsers: [{
      companyCode: "",
      companyName: "",
      accessUsers: []
    }],
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
  delConvert(e) {
    var index = e.currentTarget.dataset.key;
    var flag = e.currentTarget.dataset.flag;
    var that = this;
    wx.showModal({
      title: flag,
      content: '是否删除？',
      confirmColor: "#f60",
      success(res) {
        if (res.confirm) {
          that.data.converts.splice(index, 1);
          that.setData({
            converts: that.data.converts
          });
        }
      }
    })
  },
  delDepartment(e){
    var index = e.currentTarget.dataset.key;
    var deptname = e.currentTarget.dataset.deptname;
    var that = this;
    wx.showModal({
      title: deptname,
      content: '是否删除？',
      confirmColor: "#f60",
      success(res) {
        if (res.confirm) {
          that.data.accessDepartments.splice(index, 1);
          that.setData({
            accessDepartments: that.data.accessDepartments
          });
        }
      }
    })
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
  addDepartment() {
    var deptName = [],deptCode=[];
    for (var i = 0; i < this.data.departments.length; i++) {
      var exists = false;
      for (var j = 0; j < this.data.accessDepartments.length; j++) {
        if (this.data.departments[i].DepartmentCode == this.data.accessDepartments[j].companyCode) {
          exists = true;
        }
      }
      if (!exists){
        deptName.push(this.data.departments[i].DepartmentName);
        deptCode.push(this.data.departments[i].DepartmentCode);
      }
    }
    if (deptCode.length>0){
      var that = this;
      wx.showActionSheet({
        itemList: deptName,
        success(res) {
          var code = deptCode[res.tapIndex];
          var name = deptName[res.tapIndex];
          wx.navigateTo({
            url: "/pages/adddepartment/adddepartment?code=" + code + "&name=" + name +"&departmentsSelected=[]"
          })
        }
      })
    }
  },
  addUser(e){
    var deptName = [], deptCode = [];
    for (var i = 0; i < this.data.departments.length; i++) {
      var exists = false;
      for (var j = 0; j < this.data.accessUsers.length; j++) {
        if (this.data.departments[i].DepartmentCode == this.data.accessUsers[j].companyCode) {
          exists = true;
        }
      }
      if (!exists) {
        deptName.push(this.data.departments[i].DepartmentName);
        deptCode.push(this.data.departments[i].DepartmentCode);
      }
    }
    if (deptCode.length > 0) {
      var that = this;
      wx.showActionSheet({
        itemList: deptName,
        success(res) {
          var code = deptCode[res.tapIndex];
          var name = deptName[res.tapIndex];
          wx.navigateTo({
            url: "/pages/addduser/addduser?code=" + code + "&name=" + name + "&userSelected=[]"
          })
        }
      })
    }
  },
  updateConvert(e) {
    var index = e.currentTarget.dataset.key;
    var convert = this.data.converts[index];
    wx.navigateTo({
      url: "/pages/addconvert/addconvert?index=" + index + "&flag=" + convert.flag + "&format=" + convert.format + "&model=" + convert.model + "&x=" + convert.x + "&y=" + convert.y + "&width=" + convert.width + "&height=" + convert.height + "&imageQuality=" + convert.imageQuality
    })
  },
  updateDepartment(e){
    var index = e.currentTarget.dataset.key;
    var accessDept = this.data.accessDepartments[index];
    wx.navigateTo({
      url: "/pages/adddepartment/adddepartment?index=" + index + "&code=" + accessDept.companyCode + "&name=" + accessDept.companyName + "&departmentsSelected=" +JSON.stringify(accessDept.accessCodes)
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
    app.get(app.baseUrl + "department/getalldepartment", {}, function(res) {
      if (res.code == 0) {
        this.setData({
          departments: res.result,
        })
      }
    }.bind(this));
  }
})