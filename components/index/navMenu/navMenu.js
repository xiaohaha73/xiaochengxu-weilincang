// components/index/navMenu/navMenu.js
// 获取应用实例
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    itemWidth: '' // 屏幕宽度四等分
  },

  lifetimes: {
    attached: function() {
      // 初始化每个菜单的宽度 屏幕宽度的四等分
      this.setData({
        itemWidth: (app.globalData.windowWidth/4) + 'px'
      });
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
