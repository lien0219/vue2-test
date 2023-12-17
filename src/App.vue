<template>
  <!-- <div>
    <div class="top-category">
      <ul>
        <li
          v-for="category in categories"
          :key="category.id"
          @click="selectCategory(category)"
        >
          {{ category.name }}
        </li>
      </ul>
    </div>
    <HelloWorld />
  </div> -->
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
// import HelloWorld from "./components/HelloWorld.vue";
// export default {
//   components: {
//     HelloWorld,
//   },
//   data() {
//     return {
//       categories: [
//         { id: 1, name: "分类1" },
//         { id: 2, name: "分类2" },
//         { id: 3, name: "分类3" },
//       ],
//     };
//   },
//   methods: {
//     selectCategory(category) {
//       // 执行对应分类的操作，比如展示商品列表或者跳转到详情页
//       console.log("选中分类:", category);
//     },
//   },
// };
</script>

<style>
#app {
  height: 100vh;
}

html,
body {
  margin: 0;
  padding: 0;
}
</style>
