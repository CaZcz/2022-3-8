// pages/testing/testing.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    title: '',
    amap: '',
    geo_location: '',
    inputValue: '',
    around_data: '',
    region: ['广东省', '广州市', '海珠区'],
    iconList: [{
      icon: 'shopfill',
      color: 'red',
      badge: 0,
      name: '餐饮',
      amap: '050000',
    }, {
      icon: 'recordfill',
      color: 'orange',
      badge: 0,
      name: '风景',
      amap: '110000',
    }, {
      icon: 'picfill',
      color: 'yellow',
      badge: 0,
      name: '科教',
      amap: '140000',
    }, {
      icon: 'noticefill',
      color: 'olive',
      badge: 0,
      name: '生活服务',
      amap: '070000',
    }, {
      icon: 'upstagefill',
      color: 'cyan',
      badge: 0,
      name: '医疗',
      amap: '090000',
    }, {
      icon: 'goodsfill',
      color: 'blue',
      badge: 0,
      name: '购物',
      amap: '060000',
    }, {
      icon: 'discoverfill',
      color: 'purple',
      badge: 0,
      name: '发现'
    }, {
      icon: 'questionfill',
      color: 'mauve',
      badge: 0,
      name: '帮助'
    }, {
      icon: 'commandfill',
      color: 'purple',
      badge: 0,
      name: '问答'
    }, {
      icon: 'brandfill',
      color: 'mauve',
      badge: 0,
      name: '版权'
    }],
    gridCol: 3,
    skin: false
  },
  

  canying: function (e) {
    var title = e.currentTarget.dataset.name;
    var amap = e.currentTarget.dataset.amap;
    var location = this.data.geo_location;

    // 点击九宫格跳转
    wx.navigateTo({
      url: '/pages/testing/canying/canying' + '?' + 'detail_title=' + title + '&' + 'detail_amap=' + amap + '&' + 'detail_location=' + location
    })
  },
  // 搜索框输入数据
  bindKeyInput: function (e) {
    var bindKeyInput = e.detail.value
    console.log("用户输入",e.detail.value)
    this.setData({
      inputValue: e.detail.value
    })
  },

  search: function (e) {
    var that = this
    console.log("用户输了啥",e.currentTarget.dataset.inputv)
    var search_value = e.currentTarget.dataset.inputv
    wx.request({
      url: 'https://restapi.amap.com/v3/place/around?parameters',
      data: {
        key: 'ee4776c6af367a2346340399d32ee9a6',
        location: that.data.geo_location,
        keywords: search_value
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log("POI", res.data.pois)
        that.setData({
          around_data: res.data.pois
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // 获取当前位置
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        // 获取位置成功后，调用1.逆地理编码（省市区），2.省市区存起来，写到picker  3.天气经纬度
        console.log("当前位置", res)
        const latitude = res.latitude
        const longitude = res.longitude
        that.setData({
          geo_location: res.longitude + ',' + res.latitude
        })
        console.log("data",that.data.geo_location)


        // 逆地理编码获取省市区
        wx.request({
          url: 'https://restapi.amap.com/v3/geocode/regeo?parameters',
          data: {
            key: 'ee4776c6af367a2346340399d32ee9a6',
            location: res.longitude + ',' + res.latitude
          },
          success(res) {
            // 将省市区存入
            console.log("当前逆地理编码", res.data.regeocode.addressComponent)
            const province = res.data.regeocode.addressComponent.province
            const city = res.data.regeocode.addressComponent.city
            const district = res.data.regeocode.addressComponent.district
            const township = res.data.regeocode.addressComponent.township
            that.setData({
              region: [province, city, district, township]
            })
          }
        })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})