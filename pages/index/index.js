// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    //tabbar
    tabbar: {},
    windowWidth: '', // 屏幕宽度
    rentHouse: [], // 低价出租房数据
    company: [] // 入驻公司数据
  },
  onLoad() {
    wx.hideTabBar();
    app.editTabbar();

    // 初始化顶部标题栏背景图片宽度
    this.initWindowWidth();
    
    // 获取数据
    this.getData();
  },
  // 获取屏幕宽度
  initWindowWidth: function () {
    this.setData({
      windowWidth: app.globalData.windowWidth + 'px'
    });
  },

  // 获取数据函数
  getData: function () {

    const that = this;

    const url = app.globalData.serverUrl + 'index.php?c=index_lunbo_wlc&a=getOthersInfo';
    wx.request({
      url: url,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        // console.log(res.data)
        that.setData({
          rentHouse: res.data.zjf,
          company: res.data.com
        });
      }
    })
  }

})
