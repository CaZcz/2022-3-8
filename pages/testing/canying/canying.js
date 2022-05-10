Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    amap: '',
    geo_location: '',
    region: ['广东省', '广州市', '海珠区'],
    arround: '',
    pois: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title: options.detail_title,
      amap: options.detail_amap
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    // 获取当前位置
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        // 获取位置成功后，调用1.逆地理编码（省市区），2.省市区存起来，写到picker  3.天气经纬度
        console.log("当前位置", res)
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        that.setData({
          geo_location: res.longitude + ',' + res.latitude
        })


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
            that.setData({
              region: [province, city, district]
            })
          }
        })

        // 搜索周围POI
        wx.request({

          url: 'https://restapi.amap.com/v3/place/around?parameters',
          data: {
            key: 'ee4776c6af367a2346340399d32ee9a6',
            location: res.longitude + ',' + res.latitude,
            types: that.data.amap
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            console.log("POI", res.data.pois)
            that.setData({
              pois: res.data.pois
            })
          }
        })

      }
    })


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