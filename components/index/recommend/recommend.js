// components/index/recommend/recommend.js
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
    newDatas: [] // 获取到的推荐信息
  },

  lifetimes: {
    attached: function () {
      // 获取推荐列表的数据
      this.getRecommend();
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取推荐信息函数
    getRecommend: function () {
      const that = this;
      // https://new.lincangq.cn/index.php?c=index_info_wlc&a=getIndexDatas_news_new
      const url = app.globalData.serverUrl + 'index.php?c=place_form_wlc&a=getDatasTest';
      // 发送请求请求数据
      wx.request({
        url: url,
        data: {
          siteName: '临沧市'
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: (res) => {
          // console.log(res.data);
          that.setData({
            newDatas: res.data.slice(0,3)
          });
          // 将newDatas存到全局属性当中方便页面跳转时使用
          app.globalData.recommendData = res.data;
        }
      });
    },

    // 展示推荐信息详情
    showDetail: function (e) {
      // console.log(e.currentTarget.id)
      const id = e.currentTarget.id;
      // 判断类型
      const type = this.data.newDatas[Number(id)].infotype_name;
      if (type === '全职招聘') {
        // 页面跳转
        wx.navigateTo({
          url: '../jobDetail/jobDetail?index=' + id,
        })
      } else { // 房产类的详情页面跳转
        wx.navigateTo({
          url: '../detail/detail?index=' + id,
        })
      }

    }
  }
})
