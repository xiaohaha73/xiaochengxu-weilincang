// components/reqDetail/reqList.js
const app = getApp();
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
    url: app.globalData.serverUrl,
    reqData: []
  },
  lifetimes: {
    attached: function() {
      
      // 获取页面数据
      this.getData();
    }
  },


  /**
   * 组件的方法列表
   */
  methods: {

    // 获取页面数据事件
    getData: function() {
      wx.showLoading();
      const that = this;
      let formData = [];
      // 通过openid获取发布的求助信息
      const openId = 'oCUPt0I4BICLUzht50yD0a_mYqPw';
      formData.openid = openId;
      wx.request({
        url: that.data.url + "/index.php?c=life_help_wlc&a=getMylifehelp",
        data: formData,
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          // console.log(res.data)
          wx.hideLoading();
          that.setData({
            reqData: res.data
          })
        }
      });
    },

    // 删除求助事件
    delHandle: function(e) {
      const that = this;
      // console.log(e.currentTarget.dataset.index)
      const index = e.currentTarget.dataset.index; // 求助索引值
      // 发送请求
      wx.request({
        url: getApp().globalData.serverUrl + '/index.php?c=life_help_wlc&a=disableLife',
        data: {
          nid: index,
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          // 删除成功 刷新页面数据
          that.getData();
        }
      })
    },


    // 展示详情页面
    showDetail: function(e) {
      const index = e.currentTarget.dataset.index; // 求助索引值
      wx.navigateTo({
        url: '/pages/noteDetail/noteDetail?id=' + index,
      })
    }

  }
})
