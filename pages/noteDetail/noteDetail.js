// pages/noteDetail/noteDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgServerUrl:getApp().globalData.serverUrl,
    topicDetail: null, // 收到的话题数据
    imagesList: [],
    isFill: false,
    imgWidth: '',
    imgHeight: '',
    showInput: false, // 弹出评论框
    keyBroadHeight: "0px" // 整个页面的高度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id;
    // console.log(id);
    this.getTopicDetail(id);
  },

  // 初始化图片宽度函数
  setImgWidth: function () {
    // 获取屏幕的宽度
    const screenWidth = wx.getSystemInfoSync().windowWidth;
    // console.log(screenWidth);
    const imgLength = this.data.imagesList.length;
    if (imgLength === 1) { // 只有一张图片的情况
      this.setData({
        imgWidth: '100%',
      });
    } else if (imgLength === 2 || imgLength === 4) { // 2,4 张图的情况
      // 间隔2.5px
      this.setData({
        imgWidth: ((screenWidth - 30 - 2.5) / 2) + 'px',
        imgHeight: ((screenWidth - 30 - 2.5) / 2) + 'px'
      });
    } else if (imgLength === 3 || imgLength === 9) { // 3,9张图片的情况
      this.setData({
        imgWidth: ((screenWidth - 30 - 2.5) / 3) + 'px',
        imgHeight: ((screenWidth - 30 - 2.5) / 3) + 'px'
      });

    } else if (imgLength === 5 || imgLength === 8) {
      this.setData({
        imgWidth: ((screenWidth - 30 - 2.5) / 3) + 'px',
        imgHeight: ((screenWidth - 30 - 2.5) / 3) + 'px',
        isFill: true // 同时还要设置一个占位的盒子
      });
    }
  },

  // 根据话题id查询出话题详情
  getTopicDetail: function (id) {
    const that = this;

    wx.showLoading();
    // 当前用户的openId
    const openId = "oCUPt0I4BICLUzht50yD0a_mYqPw";

    wx.request({
      url: getApp().globalData.servsers + '/index.php?c=life_help_wlc&a=getLifeHelpInfo',
      data: {
        nid: id,
        openid: openId
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log("数据列表：", res.data);
        that.setData({
          topicDetail: res.data,
          imagesList: res.data.picarr
        })

        // 初始化图片宽度
        that.setImgWidth();
        wx.hideLoading();
      }
    })

  },


  // 点赞点击事件
  dianzanHandle: function() {},

  // 点击弹出评论框函数
  commentHandle: function () {
    this.setData({
      showInput: true
    });
  },

  // 获取键盘高度并赋值给输入框
  setKeyBoard: function(e) { 
    this.setData({
      keyBroadHeight: e.detail.height + "px"
    });
  },

  // 键盘关闭事件
  closeKeyBoard: function() {
    this.setData({
      keyBroadHeight:"0px"
    });
  },

  // 软键盘点击确定或点击发送按钮事件
  sendHandle: function() {
    console.log('发送')
  }
})