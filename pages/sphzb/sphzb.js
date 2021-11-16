// pages/sphzb/sphzb.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    servsers: getApp().globalData.servsers,

    newDatas: [],
    pcount: 0,
    page: 1,
    itemWidth: '', // 每个元素宽度
    tagList: [
      {
        name:'#全部',
        id: '0'
      },
      {
        name:'#临沧招聘',
        id: '1'
      },
      {
        name:'#临沧房产',
        id: '2'
      },
      {
        name:'#临沧攻略',
        id: '3'
      },
      {
        name:'#临沧资讯',
        id: '4'
      }
    ],
    dataList: [], // 请求到的数据
    type: 0 // 数据类型
  },
  to_zb: function () {
    wx.getChannelsLiveNoticeInfo({
      finderUserName: 'sphMy8tTedf75Qq',
      success(res) {
        if (res.status == 0) { // 预告状态：0可用 1取消 2已用                   
          if (res.noticeId) {
            wx.reserveChannelsLive({
              noticeId: res.noticeId,
              success(res1) {
                console.log('res1', res1)
              },
              fail(fail1) {
                console.log('fail1', fail1)
              }
            });
          }
        }
      },
      fail(fail) {
        console.log('fail', fail)
        wx.getChannelsLiveInfo({
          finderUserName: 'sphMy8tTedf75Qq',
          success(res) {
            console.log('res3', res)
            wx.showModal({
              title: '提示',
              content: '你确定要打开微临沧直播间吗',

              success: function (res) {
                if (res.cancel) {

                } else if (res.confirm) {
                  wx.openChannelsLive({
                    finderUserName: 'sphMy8tTedf75Qq',
                    feedId: res.feedId,
                    success(res4) {
                      console.log('res4', res4)
                    },
                    fail(fail14) {
                      console.log('fail14', fail14)
                    }
                  })
                }
              }
            })

          },
          fail(fail) {
            console.log('fail3', fail)
          }
        })
      }
    })
  },
  openActivity: function (e) {
    var finderUserName = e.currentTarget.dataset.finderusername;
    var feedid = e.currentTarget.dataset.feedid;
    wx.openChannelsActivity({
      finderUserName: finderUserName,
      feedId: feedid,
      success(res) {
        console.log(res)
      },
      fail: function (error) {
        console.log(error)
        wx.showToast({
          title: '获取失败!',
        })

      },
      complete: function (res) {
        console.log(res)
      }
    })


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    const windowWidth = wx.getSystemInfoSync()['windowWidth'];
    that.setData({
      itemWidth: (windowWidth - 12) / 2 + 'px'
    });

    that.getData();
    that.getSphList();
  },
  getSphList: function () {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    var page = that.data.page;
    wx.request({
      url: getApp().globalData.servsers + '/index.php?c=video_number_wlc&a=getSphList',
      data: {
        page: page
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("推荐服务：", res.data)
        var newDatasnew = res.data;
        var newDatas = that.data.newDatas;
        if (newDatasnew.length == 0) {
          that.setData({
            pcount: 1
          })
        }
        that.setData({
          newDatas: newDatas.concat(newDatasnew),
          page: page + 1
        })
        wx.hideLoading();
      },
      fail: function () {
        wx.hideLoading();
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    var pcount = that.data.pcount;
    if (pcount == 0) {
      that.getSphList();
    } else {
      that.setData({
        hasMore: false
      })
      wx.showToast({
        title: '已到底!',
      })
    }
    wx.showLoading({
      title: '加载中',
    })
    const page = that.data.page + 1;
    const type = that.data.type;

    that.getData(type, page, 'loadmore'); // 加载更多数据
  },

  /**
   * type 视频分类类型
   * page 第几页数据
   */
  getData: function (type = 0, page = 1, method = 'init') {
    const that = this;
    wx.showLoading({
      title: '加载中',
    })
    const url = this.data.servsers + '/index.php?c=video_number_wlc&a=getSphList';
    wx.request({
      url: url,
      data: {
        type: type,
        page: page
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        wx.hideLoading();
        if (method === 'init') { // 初始化数据模式
          that.setData({
            dataList: res.data
          });
        } else { // 加载更多模式
          if (res.data.length === 0) {
            that.setData({ // 没有数据改为第1页
              page: 1
            });
            // 提示没有新数据
            wx.showToast({
              title: '已到底!',
            })
          } else {
            that.setData({ // 加上新数据
              dataList: that.data.dataList.concat(res.data)
            });
          }
        }

      },
      fail: () => {
        wx.hideLoading();
      }
    })
  },
  jumpHandle: function (e) {
    console.log(e)
  },
  /**
   * 点击选择类别函数
   */
  selectHandle: function (e) {
    const type = Number(e.target.id);
    this.setData({
      type: type
    });
    this.getData(type);
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})