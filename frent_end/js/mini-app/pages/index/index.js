//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
      coll: [],
      filters: [],
      content: '',
      currentTime: ""
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.getTime();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  add(e){
     let content = this.data.content;
     this.data.coll.push(
        {content}
     );
     this.setData({
       coll: this.data.coll,
       filters: this.data.coll
     });
  },
  searching(e) {
    var value = e.detail.value;
    if (!value) {
      const c = this.data.coll 
      this.setData({
        filters: c
      });
      return;
    }
    const f = this.data.coll.filter( (item) => {
        if (item.content.indexOf(value) > -1) {
          return item;
        }
    });
    this.setData({
      filters: f,
      content: value
    });
  },
  del(e) {
    let index = e.currentTarget.dataset.index;
    console.log(index);
    this.data.filters.splice(index, 1);
    this.setData({
      filters: this.data.filters
    });
  },
  getTime() {
    setInterval( () => {
      const date = new Date();
      const y = date.getFullYear();
      const m = date.getMonth() + 1;
      const d = date.getDate();
      const h = date.getHours();
      const minu = date.getMinutes();
      let s = date.getSeconds();
      s = s > 9 ? s : '0' + s
      const time = `${y}-${m}-${d}  ${h}:${minu}:${s}`;
      this.setData({
         currentTime: time
      });
    }, 1000);
  }
})
