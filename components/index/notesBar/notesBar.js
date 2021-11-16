// components/index/notesBar/notesBar.js
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
    noteList: [] // 请求到的公告列表
  },

  lifetimes: {
    attached: function() {
      const that = this;
      // 请求数据
      const serverUrl = getApp().globalData.servsers + '/index.php?c=life_help_wlc&a=getLifeHelpIndex';
      wx.request({
        url: serverUrl,
        data: {
          page: 1
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          // console.log(res.data);
          that.setData({
            noteList: res.data
          })
        }
      })

    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 公告详情跳转页面
    jumpHandle:function(e) {
      // console.log(e.currentTarget.dataset.id)
      const id = e.currentTarget.dataset.id; // 公告id
      wx.navigateTo({
        url: `/pages/noteDetail/noteDetail?id=${id}`,
      })
    }
  }
})
