// components/index/noMore/noMore.js
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 返回顶部点击事件
    topTopHandle: function() {
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  }
})
