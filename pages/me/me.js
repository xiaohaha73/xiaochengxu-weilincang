// pages/me/me.js
// 获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemWidth: '',
    //tabbar
    tabbar: {},
    userInfo: {} // 登陆用户的信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    const windowWidth = wx.getSystemInfoSync().windowWidth;
    this.setData({
      itemWidth: (windowWidth - 18) / 3 + 'px'
    });

    wx.hideTabBar();
    app.editTabbar();

    // 获取登陆的用户缓存信息
    const userInfo = wx.getStorageSync('userInfo');

    if (userInfo) {
      this.setData({
        userInfo: userInfo
      });
    }

  }

})