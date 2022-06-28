// pages/cv_detail/cv_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    access_token: '',
    img_data: '',
    bg_image: '',
    api_image: '',
    types_name: '',
    title:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log("ai传过来的图片链接", options)
    const base64ImgUrl = "data:image/png;base64," + options.image;
    this.setData({
      bg_image: base64ImgUrl,
      types_name: options.title_name,
      title: options.title,
      api_image: options.image,
    })



    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token', //百度access_token URL地址
      data: {
        grant_type: 'client_credentials',
        client_id: 'jM8xEQOb6Ehb3kIYt1TC43Hp',
        client_secret: 'pXEoBbhBBRjkXBcldjhqhPjYSFh0egPf'
      },

      header: {
        'content-type': 'application/json' // 默认值
      },

      success(res) {
        console.log(res.data.access_token)
        that.setData({
          access_token: res.data.access_token
        })

        wx.request({
          url: 'https://aip.baidubce.com/rest/2.0/image-classify/v1/' + that.data.types_name,
          data: {
            access_token: that.data.access_token,
            image: that.data.api_image,
            top_num: 3,
            baike_num: 3

          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },

          success(res) {
            console.log("aaaaaa", res.data)
            that.setData({
              img_data: res.data.result
            })
            console.log("acacaca", that.data)
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