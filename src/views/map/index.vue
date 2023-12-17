<template>
  <div class="hello">
    <div id="mapBox"></div>
    <input
      type="text"
      v-model="coordinate"
      placeholder="输入坐标，格式为：经度,纬度"
    />
    <button @click="locate">定位</button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      coordinate: "",
    };
  },
  mounted() {
    // 创建地图实例
    const map = new window.BMap.Map("mapBox");
    // 创建点坐标(可以使用百度地图拾取坐标系统获取指定的位置坐标)
    const point = new window.BMap.Point(116.404, 39.915);
    // 初始化地图，设置中心点坐标和地图级别
    map.centerAndZoom(point, 15);
    // 启用滚轮缩放
    map.enableScrollWheelZoom(true);
    // 在地图上添加标注
    const marker = new window.BMap.Marker(point);
    map.addOverlay(marker);
    // 创建信息窗口
    const infoWindow = new window.BMap.InfoWindow("这是提示信息");
    // 将信息窗口保存在组件的data中
    this.infoWindow = infoWindow;
    this.map = map; // 将地图实例保存在组件的data中
  },
  methods: {
    locate() {
      const [lng, lat] = this.coordinate.split(",");
      const point = new window.BMap.Point(lng, lat);
      this.map.centerAndZoom(point, 10);
      const marker = new window.BMap.Marker(point);
      this.map.clearOverlays();
      this.map.addOverlay(marker);
      this.map.enableScrollWheelZoom(true);
      // 给标注添加鼠标移入事件
      marker.addEventListener("mouseover", () => {
        this.map.openInfoWindow(this.infoWindow, point); // 显示信息窗口
      });
      // 给标注添加鼠标移出事件
      marker.addEventListener("mouseout", () => {
        this.map.closeInfoWindow(); // 隐藏信息窗口
      });
    },
  },
};
</script>

<style scoped>
.hello {
  width: 100%;
  height: 500px;
  border: 1px solid black;
}
#mapBox {
  height: 100%;
  width: 100%;
}
</style>
