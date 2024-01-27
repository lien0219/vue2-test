<template>
  <div class="mian">
    <div
      :class="{ highLight: activeIndex == index }"
      class="tabs"
      @click="activeIndex = index"
      v-for="(item, index) in list"
      :key="item"
    >
      <div class="item">
        {{ item }}
      </div>
    </div>
    <div class="swiper" v-for="(it, ind) in arr" :key="ind">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          {{ activeIndex == 0 ? it.componentName : it.componentId }}
        </div>
        <!-- <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div> -->
      </div>
      <div class="swiper-pagination"></div>

      <!-- <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div> -->

      <!-- <div class="swiper-scrollbar"></div> -->
    </div>
    <!-- <div
      class="swiper"
      v-for="(it, ind) in arr"
      :key="ind"
      v-show="activeIndex == 1"
    >
      <div class="swiper-wrapper">
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
      </div>
      <div class="swiper-pagination"></div>
    </div> -->
  </div>
</template>
<script>
// 引入js
import Swiper from "swiper";
// 引入css
import "swiper/css/swiper.min.css";

export default {
  data() {
    return {
      activeIndex: 0,
    };
  },
  props: {
    list: {
      type: Array,
      default: [],
    },
    arr: {
      type: Array,
      default: [],
    },
  },
  mounted() {
    var mySwiper = new Swiper(".swiper", {
      slidesPerView: 2,
      slidesPerColumn: 2,
      spaceBetween: 30,

      // direction: "vertical", // 垂直切换选项
      // loop: true, // 循环模式选项

      // 如果需要分页器
      pagination: {
        el: ".swiper-pagination",
      },

      // 如果需要前进后退按钮
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      // 如果需要滚动条
      scrollbar: {
        el: ".swiper-scrollbar",
      },
    });
  },
};
</script>
<style scoped>
.mian {
  /* height: 500px; */
  /* width: 300px; */
  background-color: aqua;
}
.tabs {
  display: flex;
  flex-wrap: nowrap;
  /* justify-content: center; */
  background-color: aliceblue;
}
.item {
  text-align: center;
  /* background-color: blue; */
  margin: 10px;
  width: 100px;
  background-color: antiquewhite;
}
.highLight {
  background-color: blueviolet;
}
.swiper {
}
.swiper-wrapper {
}
.swiper-slide {
  background-color: rgb(7, 73, 51);
}
</style>
