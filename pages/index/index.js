//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    
  },
  
  onLoad: function () {
    
  },
  onPullDownRefresh:function(){
    console.log("fresh");
  },
  onReachBottom:function(){
    console.log("down");
  }
})
