Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    amap: '',

    region: ['广东省', '广州市', '海珠区'],
    arround: '',
    pois: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      title: options.detail_title,
      amap: options.detail_amap,

    })

    // 搜索周围POI
    wx.request({
      url: 'https://restapi.amap.com/v3/place/around?parameters',
      data: {
        key: 'ee4776c6af367a2346340399d32ee9a6',
        location: options.detail_location,
        types: options.detail_amap
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
    console.log("lllllllocation", options)
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