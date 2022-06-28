
Page({

  /**
   * 页面的初始数据
   */
  data: {
    access_token:'',
    isScroll:false,
    curIndex:0, // 决定左侧分类
    tname:'',
    detailtname:'',
    category:[
      {
        "title":"红酒识别",
        "id":'hjsb',
        "bg_img":"http://rcqjced6l.hn-bkt.clouddn.com/hjsb-bg.jpg",
        "content":"识别图像中的红酒标签，返回红酒名称、国家、产区、酒庄、类型、糖分、葡萄品种、酒品描述等信息，可识别数十万中外红酒；支持自定义红酒图库，在自建库中搜索特定红酒信息",
        "title_name":"redwine"
      },
      {
        "title":"植物识别",
        "id":"zwsb",
        "bg_img":"http://rcqjced6l.hn-bkt.clouddn.com/zwsb-bg.jpg",
        "content":"可识别超过2万种常见植物和近8千种花卉，接口返回植物的名称，并支持获取识别结果对应的百科信息；还可使用EasyDL定制训练平台，定制识别植物种类。适用于拍照识图、幼教科普、图像内容分析等场景",
        "title_name":"plant"
      },
      {
        "title":"动物识别",
        "id":"dwsb",
        "bg_img":"http://rcqjced6l.hn-bkt.clouddn.com/dwsb-bg.jpg",
        "content":"识别近八千种动物，接口返回动物名称，并可获取识别结果对应的百科信息；还可使用EasyDL定制训练平台，定制识别分类标签。适用于拍照识图、幼教科普、图像内容分析等场景",
        "title_name":"animal"
      },
      {
        "title":"地标识别",
        "id":"dbsb",
        "bg_img":"http://rcqjced6l.hn-bkt.clouddn.com/dbsb-bg.jpg",
        "content":"支持识别12万中外著名地标、热门景点；还可使用EasyDL定制训练平台，定制地标分类标签。广泛应用于拍照识图、幼教科普、图片分类等场景",
        "title_name":"landmark"
      },
      {
        "title":"货币识别",
        "id":"hbsb",
        "bg_img":"http://rcqjced6l.hn-bkt.clouddn.com/hbsb-bg.jpg",
        "content":"识别图像中的货币类型，返回货币名称、代码、面值、年份信息，可识别百余种国内外常见货币；还可使用EasyDL定制训练平台，定制识别货币种类",
        "title_name":"currency"
      }
    ],
    toView: 'hjsb', //决定右侧的视图显示，与curIndex一一对应

  },


  /**
   * 生命周期函数--监听页面加载
   */
  

  selectPhoto(e) {
    // wxml页data-参数传至cv_detail页
    const title_name = e.currentTarget.dataset.tname;
    const title = e.currentTarget.dataset.detailtname
    console.log("ttttttttttttttnaem",e.currentTarget.dataset)
    // 选择图片
    wx.chooseMedia({
      count: 9,
      mediaType: ['image','video'],
      sourceType: ['album','camera'],
      maxDuration: 30,
      camera: 'back',
      success(res) {
        console.log(res.tempFiles[0].tempFilePath)
        wx.getFileSystemManager().readFile({
          filePath: res.tempFiles[0].tempFilePath,
          encoding: "base64",
          success(res) {
            var image_url = res.data;
            console.log('image_url',image_url)
            wx.navigateTo({
              url: '/pages/cv_detail/cv_detail?image='+image_url + '&' +'title_name='+title_name + '&' +'title='+title,
            })
          },
          fail(res) {
            console.error(res)
          }
        })
      }
    })
  },


  switchTab(e) {
    const self = this;
    this.setData({
      isScroll: true
    })
    setTimeout(function () {
      self.setData({
        toView: e.target.dataset.id,
        curIndex: e.target.dataset.index
      })
      console.log("e.target.dataset.id",e.target.dataset.id)
      console.log("e.target.dataset.index",e.target.dataset.index)
    }, 0)
    setTimeout(function () {
      self.setData({
        isScroll: false
      })
    }, 1)
  },

  onLoad: function (options) {
    
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