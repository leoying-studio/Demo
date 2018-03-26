// pages/discover/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabsInfo: [],
    activeTab: 0,
    tabs: [
      {name: "专题"},
      {name: "栏目"}
    ],
    underlineTransition:"",
    subjects: [
      { image: "https://cdn.yryz.com/pic/yryz-new/b083bc2dc5a21609404d404ab8680f87.jpg?w=1142&h=397"},
      { image: "https://cdn.yryz.com/pic/yryz-new/1d5ffc5bbb55498496e85f6e06407f21.jpg?w=1242&h=596" },
      { image: "https://cdn.yryz.com/pic/yryz-new/24eef561ef43a142a49faca61163aa93.jpg?w=1242&h=702" },
      { image: "https://cdn.yryz.com/pic/yryz-new/9c36d08cd27dff6caee382d3d783ac2c.png?w=1061&h=600" },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getElementInfo();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
  getElementInfo() {
    const that = this;
    let query = wx.createSelectorQuery();
    const elements = query.selectAll(".tab-item");
    const els = elements.boundingClientRect();
    els.exec(function (res) {
      that.setData({
          tabsInfo: res[0]
        });
    });
  },
  setSwiper(index) {
    let position = this.data.tabsInfo[index].left - this.data.tabsInfo[index].width * 2;
    position = `transform: translateX(${position}px); transition: all 0.3s`;
    this.setData({
      activeTab: index,
      underlineTransition: position
    });
  },
  changeTab(e) {
    const index = e.currentTarget.dataset.index;
    this.setSwiper(index);
  },
  swiperChange(e) {
      this.setSwiper(e.detail.current);
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})