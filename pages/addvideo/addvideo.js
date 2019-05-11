const app = getApp()
Page({
  data: {
    videoUrls: [],
    converts: [],
    departments: [],
    accessDepartments: [],
    accessUsers: [],
    videoQualityItems: ['原画', '稍低', '中等', '差'],
    longPressIndex: 0
  },
  removeItem(e) {
    var id = e.currentTarget.dataset.id;
    this.data.videoUrls.splice(id, 1);
    this.setData({
      videoUrls: this.data.videoUrls,
      longPressIndex: 0
    })
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
  longPress(e) {
    var url = e.currentTarget.dataset.url;
    for (var i = 0; i < this.data.videoUrls.length; i++) {
      if (this.data.videoUrls[i].toString() == url.toString()) {
        var longPressIndex = i + 1;
        this.setData({
          longPressIndex: longPressIndex
        });
        break;
      }
    }
  },
  chooseVideo:function(){
    var that = this;
    wx.chooseVideo({
      success: function (res) {
        that.data.videoUrls.push(res.tempFilePath);
        that.setData({
          videoUrls: that.data.videoUrls
        });
      },
    })
  },
  addConvert() {
    wx.navigateTo({
      url: "/pages/addvideoconvert/addvideoconvert"
    })
  },
  updateConvert(e){
    var index = e.currentTarget.dataset.key;
    var convert = this.data.converts[index];
    wx.navigateTo({
      url: "/pages/addvideoconvert/addvideoconvert?index=" + index + "&flag=" + convert.flag + "&format=" + convert.format + "&quality=" + convert.quality
    })
  },
  addDepartment() {
    var deptName = [], deptCode = [];
    for (var i = 0; i < this.data.departments.length; i++) {
      var exists = false;
      for (var j = 0; j < this.data.accessDepartments.length; j++) {
        if (this.data.departments[i].DepartmentCode == this.data.accessDepartments[j].companyCode) {
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
            url: "/pages/adddepartment/adddepartment?code=" + code + "&name=" + name + "&departmentsSelected=[]"
          })
        }
      })
    }
  },
  updateDepartment(e) {
    var index = e.currentTarget.dataset.key;
    var accessDept = this.data.accessDepartments[index];
    wx.navigateTo({
      url: "/pages/adddepartment/adddepartment?index=" + index + "&code=" + accessDept.companyCode + "&name=" + accessDept.companyName + "&departmentsSelected=" + JSON.stringify(accessDept.accessCodes)
    })
  },
  delDepartment(e) {
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
  addUser(e) {
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
            url: "/pages/adduser/adduser?code=" + code + "&name=" + name + "&userSelected=[]"
          })
        }
      })
    }
  },
  updateUser(e) {
    var index = e.currentTarget.dataset.key;
    var accessUser = this.data.accessUsers[index];
    wx.navigateTo({
      url: "/pages/adduser/adduser?index=" + index + "&code=" + accessUser.companyCode + "&name=" + accessUser.companyName + "&userSelected=" + JSON.stringify(accessUser.accessUsers)
    })
  },
  delUser(e) {
    var index = e.currentTarget.dataset.key;
    var deptname = e.currentTarget.dataset.deptname;
    var that = this;
    wx.showModal({
      title: deptname,
      content: '是否删除？',
      confirmColor: "#f60",
      success(res) {
        if (res.confirm) {
          that.data.accessUsers.splice(index, 1);
          that.setData({
            accessUsers: that.data.accessUsers
          });
        }
      }
    })
  },
  ok(e) {
    var access = [];
    if (this.data.accessDepartments.length >= this.data.accessUsers.length) {
      for (var i = 0; i < this.data.accessDepartments.length; i++) {
        access.push({
          company: this.data.accessDepartments[i].companyCode,
          departmentCodes: this.data.accessDepartments[i].accessCodes,
          accessUsers: []
        })
      }
      for (var j = 0; j < this.data.accessUsers.length; j++) {
        access[j].accessUsers = this.data.accessUsers[j].accessUsers;
      }
    } else {
      for (var i = 0; i < this.data.accessUsers.length; i++) {
        access.push({
          company: this.data.accessUsers[i].companyCode,
          departmentCodes: [],
          accessUsers: this.data.accessUsers[i].accessUsers
        })
      }
      for (var j = 0; j < this.data.accessDepartments.length; j++) {
        access[j].departmentCodes = this.data.accessDepartments[j].accessCodes;
      }
    }
    var data = {
      output: JSON.stringify(this.data.converts),
      access: JSON.stringify(access)
    };
    app.postFiles(app.baseUrl + "upload/video", this.data.videoUrls, "videos", data
      , function (result) {
      }, function () {
        wx.switchTab({
          url: '/pages/index/index'
        });
      }
    );
  },
  onLoad: function () {
    app.get(app.baseUrl + "department/getalldepartment", {}, function (res) {
      if (res.code == 0) {
        this.setData({
          departments: res.result,
        })
      }
    }.bind(this));
  }
})