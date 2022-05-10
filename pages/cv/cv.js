// pages/cv/cv.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    access_token:''
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
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
      
      success (res) {
        console.log(res.data.access_token)
        that.setData({
          access_token:res.data.access_token
        })
        // 2.input：图片output：识别文本信息
        const fsm =wx.getFileSystemManager()
        // 2.1读取本地图片
        fsm.readFile({
          filePath:'/images/12c.jpg',
          
          success:function(res){
            //2.2将图片格式转换为API指定base64格式
            var image_base64 = wx.arrayBufferToBase64(res.data)
            console.log(image_base64)
            // 2.3发起请求
            wx.request({
              url: 'https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general', 
              data: {
                access_token: that.data.access_token,
                image:image_base64
              },
              method:'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded' 
              },

              success (res) {
                console.log("aaaaaa",res.data)
                that.setData({
                  result_num:res.data.result
                })
                console.log("acacaca",that.data)
              }
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