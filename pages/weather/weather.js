// pages/weather/weather.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   geo_location:"116.480881,39.989410",
   weather_now:"",
   region: ['广东省', '广州市', '海珠区'],
   customItem: '全部'
  },


  // 高德API
  location: function() {
    var that = this;
    wx.request({
      url: 'https://restapi.amap.com/v3/geocode/geo?', //高德地理编码API接口
      data:{
        key:'ee4776c6af367a2346340399d32ee9a6',
        address:that.data.region[0]+that.data.region[1]+that.data.region[2]
      },
      header:{
        'content-type':'application/json' //默认值
      },
      success(res){
        console.log(res.data.geocodes[0].location)
        that.setData({
          geo_location:res.data.geocodes[0].location
        })
        that.weather()
      }
    })
  },

  // 和风API
  weather: function() {
    var that = this;
    wx.request({
      url: 'https://devapi.qweather.com/v7/weather/now?', //和风天气API接口
      data:{
        key:'3ebadea7b76c4a8ca42933a6353679b4',
        location:that.data.geo_location
      },
      header:{
        'content-type':'application/json' //默认值
      },
      success(res){
        console.log(res.data.now)
        that.setData({
          weather_now:res.data.now
        })
      }
    })
  },
  //省市区选择器
  bindRegionChange: function (e) {
    this.location()
    
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
      
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
      success (res) {
        // 获取位置成功后，调用1.逆地理编码（省市区），2.省市区存起来，写到picker  3.天气经纬度
        console.log("当前位置",res)
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        that.setData({
          geo_location:res.longitude + ',' + res.latitude
        })
        that.weather()
        // 逆地理编码获取省市区
        wx.request({
          url: 'https://restapi.amap.com/v3/geocode/regeo?parameters',
          data:{
            key: 'ee4776c6af367a2346340399d32ee9a6',
            location:res.longitude + ',' + res.latitude
          },
          success(res){
            // 将省市区存入
            console.log("当前逆地理编码",res.data.regeocode.addressComponent)
            const province = res.data.regeocode.addressComponent.province
            const city = res.data.regeocode.addressComponent.city
            const district = res.data.regeocode.addressComponent.district
            that.setData({
              region:[province,city,district]
            })
          }
        })

      }
     })

    that.location()
    that.weather()
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