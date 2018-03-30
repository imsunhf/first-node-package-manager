<template>
  <div id="mapWrap">
    <map 
      id="map" 
      :longitude="longitude" 
      :latitude="latitude" 
      scale="14" 
      :controls="controls" 
      @controltap="controltap" 
      :markers="markers" 
      @markertap="markertap" 
      :polyline="polyline"
      @regionchange="regionchange" 
      show-location='true'
      style="width: 100%; height: 90%;"></map>
    <div id="bottom">扫码开锁</div>
  </div>
</template>
<script>
// import img from '/resources/logo_sz.png';
export default {
  created() {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo();
    this.getLocation();
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('map');
    this.mapCtx.getCenterLocation({
      success: (res) => {
        console.log(res, 123);
        this.longitude = res.longitude;
        this.latitude = res.latitude;
        this.controls[1].position.top = res.latitude;
        this.controls[1].position.left = res.longitude;
      },
    });
  },
  data() {
    return {
      latitude: '',
      longitude: '',
      screenWidth: 0,
      screenHeight: 0,
      userInfo: {},
      mapCtx: null,
      markers: [{// 标记点用于在地图上显示标记的位置
        iconPath: '/static/resources/10.png',
        id: 0,
        latitude: 23.0999945,
        longitude: 113.3245205,
        width: 25,
        height: 40,
      }],
      polyline: [{// 指定一系列坐标点，从数组第一项连线至最后一项
        points: [{
          longitude: 113.3245211,
          latitude: 23.10229,
        }, {
          longitude: 113.324520,
          latitude: 23.21229,
        }],
        color: '#FF0000DD',
        width: 2,
        dottedLine: true,
      }],
      controls: [{// 在地图上显示控件，控件不随着地图移动
        id: 1,
        iconPath: '/static/resources/9.png',
        position: {
          left: 0,
          top: 300 - 50,
          width: 50,
          height: 50,
        },
        clickable: true,
      }, {
        id: 2,
        iconPath: '/static/resources/2.png',
        position: {
          left: 0,
          top: 300 - 50,
          width: 50,
          height: 50,
        },
        clickable: true,
      }],
      circles: [{ // 画圆
        latitude: 23.099994,
        longitude: 113.324520,
        fillColor: '#00000055',
        radius: 2000,
        strokeWidth: 1,
      }],
    };
  },
  methods: {
    getLocation() {
      // 获取位置
      wx.getLocation({
        type: 'gcj02',
        success: (res) => {
          console.log(res);
          this.longitude = res.longitude;
          this.latitude = res.latitude;
        },
      });
    },
    getUserInfo() {
      // 调用登录接口
      wx.getUserInfo({
        success: (res) => {
          this.userInfo = res.userInfo;
          console.log(this.userInfo, 222);
        },
      });
    },
    getCenterLocation() {
      this.mapCtx.getCenterLocation({
        success: (res) => {
          this.longitude = res.longitude;
          this.latitude = res.latitude;
        },
      });
    },
    bindPickerChange(e) {
      console.log(e);
      this.index = e.mp.detail.value;
    },
    regionchange(e) {
      console.log(e);
    },
    markertap(e) {
      console.log(e.markerId);
    },
    controltap(e) {
      console.log(e.controlId);
    },
  },
};
</script>
<style>
page{
  height:100%;
}
#mapWrap {
  width:100%;
  height:100%;
  background:#fff;
}
#bottom{
  width:100%;
  height:10%;
  background:#25282d;
  text-align:center;
  color:#fff;
  padding-top:4%;
  box-sizing:border-box;
}
</style>
