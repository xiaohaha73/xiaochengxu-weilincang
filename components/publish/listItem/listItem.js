// components/publish/listItem/listItem.js
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
    itemWidth: '' // 一行四个元素 每个元素的宽度
  },
  lifetimes: {
    attached: function () {
      this.initWidth();
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    initWidth: function() {
      const windowWidth = wx.getSystemInfoSync()['windowWidth'];
      this.setData({
        itemWidth: (windowWidth / 4) + 'px'
      });
    }
  }
})
