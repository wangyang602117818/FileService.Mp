//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    
  },
  
  onLoad: function () {
    // wx.request({
    //   url: '',
    // })
    // wx.showLoading({ title: "loading"});
  },
  onPullDownRefresh:function(){
    console.log("fresh");
  },
  onReachBottom:function(){
    console.log("down");
  }
})
