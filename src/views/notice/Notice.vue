<template>
  <div class="notice">
    <div class="nav">
      <el-menu
        :default-active="$route.path"
        class="el-menu-demo"
        mode="horizontal"
      >
        <el-menu-item
          @click="clickMenu(item)"
          v-for="item in menu"
          :index="item.path"
          :key="item.path"
        >
          <span slot="title">{{ item.label }}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Notice",
  data() {
    return {
      menu: [
        {
          path: "/notice/unRead",
          name: "UnRead",
          label: "未读通知",
        },
        {
          path: "/notice/read",
          name: "Read",
          label: "已读通知",
        },
      ],
    };
  },
  methods: {
    clickMenu(item) {
      console.log(item.label);
      this.$router.push({
        name: item.name,
      });
    },
  },
};
</script>

<style scoped></style>
