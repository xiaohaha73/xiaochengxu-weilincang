// pages/detail/detail.js
// 获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentItem: null, // 选中的信息详情
    url: '', // 图片服务器地址
    detail: null // 详情信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const index = Number(options.index); // 传递过来的索引值
    // 获取存储在global中推荐信息recommendData
    const newDatas = app.globalData.recommendData;
    // console.log(newDatas[index])
    // 设置导航标题样式
    wx.setNavigationBarTitle({
      title: newDatas[index].infotype_name + '详情'
    });
    this.setData({
      currentItem:newDatas[index],
      url: app.globalData.serverUrl
    });

    // 调用发送请求的函数
    this.requestData();
  },


  // 发送请求详情数据
  requestData: function () {
    const info_id = this.data.currentItem.info_id;
    const url = app.globalData.serverUrl + 'index.php?c=new_news_wlc&a=displayFLContent&nid=' + info_id;

    const that = this;

    wx.request({
      url: url,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res)=> {
        that.setData({
          detail: res.data
        });
        // console.log(that.data.detail);
      }
    });
    
  }
})