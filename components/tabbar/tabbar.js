// components/tabbar/tabbar.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabbar: {
      type: Object,
      value: {
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
          },
    
        ]
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isIphoneX: app.globalData.systemInfo.model.search('iPhone X') != -1 ? true : false
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

