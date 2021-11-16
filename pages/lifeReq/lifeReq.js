// pages/lifeReq/lifeReq.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serverUrl: app.globalData.serverUrl,
    wordCount: 0, // 文本框中的字数
    text: '', // 输入的内容
    imgList: [] // 上传的图片地址列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 文本框输入监听事件
  countHandle: function (e) {
    // console.log(e.detail.value)
    this.setData({
      wordCount: e.detail.value.length,
      text: e.detail.value
    });
  },

  // 图片上传点击事件
  addImgHandle: function () {
    const that = this;
    // 判断图片张数
    if (this.data.imgList.length === 4) {
      wx.showToast({
        title: '最多能上传4张图片',
        duration: 2000
      })

      return false;
    }

    wx.chooseImage({
      count: 4 - that.data.imgList.length, // 还能选择的图片数
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {

        const imgList = res.tempFilePaths;
        // 调用函数上传到服务器
        imgList.forEach((item) => {
          that.uploadImg(item);
        });

      }
    })

  },

  // 点击删除图片事件
  delImgHandle: function (e) {
    // console.log(e.target.dataset.index)
    const index = e.target.dataset.index;
    // 从图片数组中将图片删掉
    let imgList = this.data.imgList;
    imgList.splice(index, 1);
    this.setData({
      imgList: imgList
    });
  },

  // 上传图片到服务器函数
  uploadImg: function (imgUrl) {
    const that = this;
    const url = app.globalData.serverUrl + 'index.php?c=wxUpload&a=upFile';
    wx.uploadFile({
      filePath: imgUrl,
      name: 'file',
      url: url,
      formData: {
        type: 'news'
      },
      success: (res) => {
        // 把上传好的图片地址添加到一个数组中
        let imgList = that.data.imgList;
        imgList.push(res.data)
        that.setData({
          imgList: imgList
        });
      }
    })
  },

  // 发表点击事件
  submitHandle: function () {
    // 判断文字是否为空
    const text = this.data.text.trim();
    if (text.length === 0) {
      wx.showToast({
        title: '求助信息不能为空',
        duration: 2000
      })

      return false;
    }

    // 获取用户信息
    wx.getUserProfile({
      desc: '用于登陆',
      success: (res) => {

        wx.showLoading({
          title: '正在发表',
        })

        const userInfo = res.userInfo;
        wx.setStorageSync('userInfo', userInfo)
        // console.log(userInfo);
        let formData = [];
        formData.avatarUrl = userInfo.avatarUrl;
        formData.nickName = userInfo.nickName;
        formData.openid = 'oCUPt0I4BICLUzht50yD0a_mYqPw';
        formData.content = text;
        // 上传图片到服务器
        const imgList = this.data.imgList;
        if (imgList.length !== 0) {
          // 拼接成逗号字符串
          const imgArrString = imgList.join(',')
          formData.pic = imgArrString
        }

        // 提交
        wx.request({
          url: app.globalData.serverUrl + '/index.php?c=life_help_wlc&a=subLifeHelp',
          data: formData,
          header: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            wx.hideLoading();
            // console.log(res.data)
           wx.navigateTo({
             url: '/pages/reqDetail/reqDetail',
           })
          }
        })
      }
    });


  }
})