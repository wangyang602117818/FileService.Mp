Page({
  data:{
     userName:"",
     passWord:""
  },
  bindUserNameInput:function(e){
    this.setData({
      userName: e.detail.value
    })
  },
  bindPassWordInput:function(e){
    this.setData({
      passWord: e.detail.value
    })
  },
  login:function(e){
    console.log(this.data.userName);
    console.log(this.data.passWord);
    wx.redirectTo({ url:"/pages/index/index"});
  }
})