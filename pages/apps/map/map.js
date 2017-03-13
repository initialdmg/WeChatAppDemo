Page({
  data: {
    longitude: null,
    latitude: null,
    loadComplete: false,
    controls: [{
      id: 0,
      position: {
        left: 200,
        top: 100,
        width: 30,
        height: 30
      },
      iconPath: '/resources/map.png',
      clickable: true
    }],
     polyline: [{
      points: [{
        longitude: 113.3045211,
        latitude: 31.57229
      }, {
        latitude: 31.59229,
        longitude: 113.324520
      }],
      color:"#FF0000DD",
      width: 2,
      dottedLine: false
    }],
    markers: []
  },
  onLoad: function () {
    // 生命周期函数--监听页面加载
    var that = this
    console.log(this.data.polyline[0].points[0])
    //方法一：使用组件控制API
    //    this.mapCtx = wx.createMapContext('myMap')
    //   this.mapCtx.moveToLocation()

    //方法二：使用数据绑定
    wx.getLocation({
      type: 'wgs84', 
      success: function (res) {
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude,
//          'polyline[0].points[0].latitude': res.latitude,
//          'polyline[0].points[0].longitude': res.longitude  
        })
//        console.log(that.data)
      }
    })
  },
  onReady: function() {
    this.setData({
      loadComplete: true
    })
  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  },
  openLocatn: function () {
    wx.openLocation({
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      scale: 10
    })
  },
  chooseLocatn: function () {
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
      }
    })
  },
  tapControl: function(e){
//    let that = this
    if(e.controlId == 0) {
      this.mapCtx = wx.createMapContext('myMap')
      this.mapCtx.moveToLocation()
    }
  },
  addLocation() {
    var that = this
    console.log(this.data.polyline[0].points)
    wx.getLocation({
      type: 'wgs84',
      success: function(res){
        var polylinePoints = that.data.polyline[0].points || [];
        var point = {
          latitude: res.latitude,
          longitude: res.longitude
        }
        polylinePoints.push(point)
        console.log(polylinePoints)
        that.setData({
          'polyline[0].points': polylinePoints
        })
      }
    })
  }
})