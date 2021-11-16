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
    detail: null, // 请求到的详情信息
    isShow: false, // 控制详情多余文字的折叠
    showBtn: false // 控制展开和隐藏按钮的显示和隐藏
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const index = Number(options.index); // 传递过来的索引值
    // 获取首页的推荐信息数组
    const indexPage = getCurrentPages()[0];
    const newDatas = indexPage.data.newDatas;
    // console.log(newDatas[index])
    // 设置导航标题样式
    wx.setNavigationBarTitle({
      title: newDatas[index].infotype_name + '详情'
    });
    this.setData({
      currentItem:newDatas[index],
      url: app.globalData.serverUrl
    });

    // 调用请求数据的函数
    this.requestData();

  },

  // 发送请求详情数据
  requestData: function () {
    const that = this;

    const info_id = this.data.currentItem.info_id;
    const url = app.globalData.serverUrl + 'index.php?c=zpqz_infos_wlc&a=displayFLContent&nid=' + info_id;

    wx.request({
      url: url,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res)=> {
        // console.log(res.data);
        that.setData({
          detail: res.data
        });

        // 判断展开文字隐藏文字按钮是否显示
        const text = res.data.post_memo;
        if (text.split('，').length > 3) {
          // 大于2行需要展开按钮
          that.setData({
            showBtn: true
          });
        }
      }
    });
    
  },

  // 控制展示更多的函数
  showHandle: function () {
    this.setData({
      isShow: !this.data.isShow
    });
  }
})