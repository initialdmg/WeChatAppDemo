Page({
  data:{
    longitude: null,
    latitude: null
  },
  onLoad:function(){
    // 生命周期函数--监听页面加载
    var that = this

    //方法一：使用组件控制API
//    this.mapCtx = wx.createMapContext('myMap')
//   this.mapCtx.moveToLocation()
    
    //方法二：使用数据绑定
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function(res){
        console.log(res)
        that.setData({
            longitude: res.longitude,
            latitude: res.latitude
        })
        console.log(that.data)
      }
    })
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  },
  openLocatn: function() {
     wx.openLocation({
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      scale: 10
    })
  },
  chooseLocatn: function() {
     wx.chooseLocation({
       success: function(res) {
         console.log(res)
       }
    })
  }
})