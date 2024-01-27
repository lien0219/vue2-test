<template>
  <div class="home">
    <!-- <div v-for="o in 4" :key="o" class="text item">
        {{ "列表内容 " + o }}
      </div> -->
    <Swiper style="height: 500px" :list="tab" :arr="cardArr"></Swiper>
  </div>
</template>
<script>
import Swiper from "./components/swiper";

export default {
  components: {
    Swiper,
  },
  data() {
    return {
      tab: ["湖南", "湖北"],
      cardArr: [
        {
          componentName: "动态组件一",
          componentId: "one",
        },
        {
          componentName: "动态组件二",
          componentId: "two",
        },
        {
          componentName: "动态组件三",
          componentId: "three",
        },
        {
          componentName: "动态组件四",
          componentId: "four",
        },
      ],
    };
  },
};
</script>
<style scoped>
.home {
  background-color: antiquewhite;
  width: 100%;
  /* height: 500px; */
  overflow: hidden;
}
</style>
