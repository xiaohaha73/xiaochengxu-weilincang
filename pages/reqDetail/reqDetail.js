// pages/reqDetail/reqDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0 // 显示的tab
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // tab栏点击事件
  activeHandle: function (e) {
    // console.log(e.target.dataset.index)
    const index = Number(e.target.dataset.index);
    this.setData({
      currentIndex:index
    });
  }
})