<template>
  <div class="news">
    <div :class="{ anim: animate }" @mouseenter="stop()" @mouseleave="up()">
      <div
        @click="handleClick(item)"
        class="news_name"
        v-for="item in newsList"
        :key="item.id"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      timer: null,
      animate: false,
      newsList: [
        { id: 1, name: "华为11111" },
        { id: 2, name: "Redmi K30 5G" },
        { id: 3, name: "小米CC9 Pro" },
        { id: 4, name: "Redmi 8" },
        { id: 5, name: "Redmi 8A" },
        { id: 6, name: "Redmi Note8 Pro" },
        { id: 7, name: "Redmi Note8" },
        { id: 8, name: "Redmi Note8" },
      ],
    };
  },
  mounted() {
    this.scrollUp(); // 开启滚动效果
  },
  methods: {
    // 查看详情
    handleClick(item) {
      console.log(item);
    },
    // 滚动
    scrollUp() {
      this.timer = setInterval(() => {
        this.animate = true; // 向上滚动的时候需要添加动画
        setTimeout(() => {
          this.newsList.push(this.newsList[0]); // 将数组的第一个元素添加到数组最后一个
          this.newsList.shift(); // 删除数组的第一个元素
          this.animate = false;
        }, 500);
      }, 4000);
    },
    //鼠标移上去停止
    stop() {
      clearInterval(this.timer);
    },
    //鼠标离开继续
    up() {
      this.scrollUp();
    },
  },
  beforeDestroy() {
    this.stop();
  },
};
</script>
<style scoped>
.news {
  width: 100%;
  height: 90px;
  background-color: #fff;
  margin-top: 50px;
  overflow: hidden;
}
.news_name {
  line-height: 30px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  transition: top 0.5s;
}
.anim {
  transition: all 0.5s;
  margin-top: -30px;
}
</style>
