<template>
  <el-menu
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    background-color="#324157"
    text-color="#fff"
    active-text-color="#20a0ff"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
  >
    <el-menu-item
      @click="clickMenu(item)"
      v-for="item in noChildren"
      :index="item.path"
      :key="item.path"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu
      v-for="item in hasChildren"
      :index="item.path + ''"
      :key="item.path"
    >
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
        <el-menu-item @click="clickMenu(subItem)" :index="subItem.path">{{
          subItem.label
        }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "CommonAside",
  data() {
    return {
      menu: [
        {
          path: "/home",
          name: "Home",
          label: "首页",
          icon: "s-home",
        },
        {
          path: "/notice",
          name: "Notice",
          label: "通知",
          icon: "bell",
        },
        {
          path: "/personal",
          name: "Personal",
          label: "个人中心",
          icon: "user",
        },
        {
          label: "人员管理",
          icon: "s-custom",
          children: [
            {
              path: "/manage/admin",
              name: "Admin",
              label: "管理员管理",
            },
            {
              path: "/manage/employees",
              name: "Employees",
              label: "员工管理",
            },
          ],
        },
        {
          path: "/map",
          name: "Map",
          label: "地图定位",
          icon: "map-location",
        },
        {
          path: "/testRef",
          name: "TestRef",
          label: "测试ref",
          icon: "document",
        },
        {
          path: "/attrs",
          name: "Attrs",
          label: "测试$attrs",
          icon: "document",
        },
        {
          path: "/eltree",
          name: "Eltree",
          label: "el-tree树形可编辑组件",
          icon: "document",
        },
        {
          path: "/lottery",
          name: "Lottery",
          label: "九宫格抽奖简易版",
          icon: "trophy",
        },
        {
          path: "/editor",
          name: "Editor",
          label: "可以编辑图片的富文本编辑器",
          icon: "edit",
        },
        {
          path: "/tab",
          name: "Tab",
          label: "增-删-改-查(模糊查询)和分页、本地存储成数据库",
          icon: "edit",
        },
        {
          path: "/drag",
          name: "Drag",
          label: "手写可拖拽移动的元素+滚轮缩放功能",
          icon: "edit",
        },
        {
          path: "/video",
          name: "Video",
          label: "视频测试",
          icon: "edit",
        },
        {
          path: "/swiper",
          name: "Swiper",
          label: "swiper功能块",
          icon: "edit",
        },
        {
          path: "/news",
          name: "News",
          label: "新闻滚动功能块",
          icon: "edit",
        },
        {
          path: "/three",
          name: "Three",
          label: "Three.js酷炫的城市展示可视化大屏",
          icon: "edit",
        },
        {
          path: "/select",
          name: "Select",
          label: "select测试",
          icon: "edit",
        },
        {
          path: "/zdes",
          name: "Zdes",
          label: "zdes测试",
          icon: "edit",
        },
        {
          path: "/textToVoice",
          name: "textToVoice",
          label: "文字语音互转",
          icon: "edit",
        },
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item) {
      console.log(item.label);
      this.$router.push({
        name: item.name,
      });
      this.$store.commit("selectMenu", item);
    },
  },
  computed: {
    noChildren() {
      return this.menu.filter((item) => !item.children);
    },
    hasChildren() {
      return this.menu.filter((item) => item.children);
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
  },
};
</script>

<style scoped>
.el-menu {
  height: 100%;
  border: none;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
