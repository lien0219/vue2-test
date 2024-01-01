<template>
  <div class="drag">
    <div class="back_box" ref="back_box">
      <div
        class="drag_box"
        draggable="true"
        @dragstart="dragstart"
        @dragend="dragend"
        @wheel="handleWeel"
        :style="`left:${elLeft}px;top:${elTop}px;width:${elWidth}px;height:${elHeight}px;`"
      >
        <div
          class="text"
          :style="`left:${(0 * elWidth) / 100}px;top:${
            (25 * elHeight) / 100
          }px;-webkit-transform: scale(${meter_zoom} )`"
        >
          拖拽我
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      initWidth: 0, // 父元素的宽-自适应值
      initHeight: 0, // 父元素的高-自适应值
      startclientX: 0, // 元素拖拽前距离浏览器的X轴位置
      startclientY: 0, //元素拖拽前距离浏览器的Y轴位置
      elLeft: 0, // 元素的左偏移量
      elTop: 0, // 元素的右偏移量

      zoom: 1, // 缩放比例
      elWidth: 0, // 元素宽
      elHeight: 0, // 元素高
      meter_zoom: 0, // 子元素缩放比例
    };
  },
  mounted() {
    this.initBodySize();
  },
  methods: {
    // 页面初始化
    initBodySize() {
      this.initWidth = this.$refs.back_box.clientWidth; // 拿到父元素宽
      // this.initHeight = this.initWidth * (1080 / 1920);
      this.initHeight = this.initWidth * ((1080 * 0.88) / (1920 - 1080 * 0.02)); // 根据宽计算高实现自适应
      this.elWidth = this.initWidth * (100 / (1920 / 2));
      this.elHeight = this.initHeight * (100 / (1080 / 2));
      this.meter_zoom = this.elWidth / 100; // 计算子元素缩放比例
    },
    // 拖拽开始
    dragstart(e) {
      console.log(e);
      this.startclientX = e.clientX; // 拖拽初始位置
      this.startclientY = e.clientY;
    },
    // 拖拽完成
    dragend(e) {
      console.log(e);
      let x = e.clientX - this.startclientX; // 计算偏移量
      let y = e.clientY - this.startclientY;
      this.elLeft += x; //拖拽元素随偏移量移动
      this.elTop += y;
    },

    // 滚轮放大缩小
    handleWeel(e) {
      console.log(e);
      if (e.wheelDelta < 0) {
        this.zoom -= 0.05;
      } else {
        this.zoom += 0.05;
      }
      if (this.zoom >= 3) {
        this.zoom = 3;
        return;
      }
      if (this.zoom <= 0.5) {
        this.zoom = 0.5;
        return;
      }

      this.elWidth = this.initWidth * (100 / (1920 / 2)) * this.zoom;
      this.elHeight = this.initHeight * (100 / (1080 / 2)) * this.zoom;
      this.meter_zoom = this.elWidth / 100;
    },
  },
};
</script>
<style scoped>
.back_box {
  border: 1px solid #000;
  background: #ccc;
  width: 70vw;
  height: 70vh;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -30%);
}

.drag_box {
  width: 100px;
  height: 100px;
  background: rgb(153, 235, 135);
  position: absolute;
  z-index: 10;
  user-select: none; /* 不可选中,拖拽时不让文字高亮 */
}

.text {
  position: absolute;
  width: 100px;
  height: 100px;
  transform-origin: 0 0; /* 用作缩放基点 */
  font-size: 24px;
}
</style>
