// app.js
App({
  onLaunch() {
   // 隐藏系统tabbar
  //  wx.hideTabBar();

   // 获取设备信息
   this.getSystemInfo();
  },
  onShow() {
    //隐藏系统tabbar
    // wx.hideTabBar();
  },
  globalData: {
    windowWidth: wx.getSystemInfoSync()['windowWidth'], // 状态栏高度
    serverUrl: 'https://new.lincangq.cn/', // 域名地址
    servsers: 'https://new.lincangq.cn/',
    tabBar:{
      "backgroundColor": "#ffffff",
        "color": "#636363",
        "selectedColor": "#f74b4b",
    "list": [
      {
        "pagePath": "/pages/index/index",
        "iconPath": "../../images/icon/index.png",
        "selectedIconPath": "../../images/icon/index01.png",
        "text": "首页"
      },
      {
        "pagePath": "/pages/business/business",
        "iconPath": "/images/icon/file.png",
        "selectedIconPath": "/images/icon/file01.png",
        "text": "商圈"
      },
      {
        "pagePath": "/pages/publish/publish",
        "iconPath": "/images/icon/add.png",
        "isSpecial": true,
        "text": "发布"
      },
      {
        "pagePath": "/pages/message/message",
        "iconPath": "/images/icon/msg.png",
        "selectedIconPath": "/images/icon/msg01.png",
        "text": "消息"
      },
      {
        "pagePath": "/pages/me/me",
        "iconPath": "/images/icon/me.png",
        "selectedIconPath": "/images/icon/me01.png",
        "text": "我的"
      }

    ]
  },
    recommendData: [] // 获取到的推荐信息列表
  },


  getSystemInfo: function () {
    let t = this;
    wx.getSystemInfo({
      success: function (res) {
        t.globalData.systemInfo = res;
      }
    });
  },

  editTabbar: function () {
    let tabbar = this.globalData.tabBar;
    let currentPages = getCurrentPages();
    let _this = currentPages[currentPages.length - 1];
    let pagePath = _this.route;
    (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
    for (let i in tabbar.list) {
      tabbar.list[i].selected = false;
      (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
    }
    _this.setData({
      tabbar: tabbar
    });
  }


})
