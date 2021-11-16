// components/index/businessSwiper/businessSwiper.js
// 获取应用实例
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: { // 请求到的入驻商家数据
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    url: '' // 服务器地址
  },
  lifetimes: {
    attached: function(){
      this.setData({
        url:app.globalData.serverUrl
      });
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
