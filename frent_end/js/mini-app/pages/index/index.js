//index.js
//获取应用实例
const app = getApp()
const homeData = require("./../../data");
Page({
  data: {
    homeData
  },
  onReady() {
     this.setData({
       homeData: homeData
     });
     console.log(homeData);
  }
})
