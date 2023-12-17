<template>
  <div class="header">
    <div class="l-content">
      <el-button
        @click="asideMenu()"
        plain
        icon="el-icon-s-unfold"
        size="mini"
      ></el-button>
      <h2>后台管理系统</h2>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="item in tags"
          :key="item.path"
          :to="{ path: item.path }"
          >{{ item.label }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown @command="clickMenu" trigger="click" size="mini">
        <span>
          <img class="user_picture" :src="adminImg" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="item in menu"
            :key="item.path"
            :command="item"
            >{{ item.label }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "CommonHeader",
  data() {
    return {
      adminImg: "",
      menu: [
        {
          path: "/personal",
          name: "Personal",
          label: "个人中心",
        },
        {
          path: "/login",
          name: "Login",
          label: "退出登录",
        },
      ],
    };
  },
  methods: {
    asideMenu() {
      this.$store.commit("collapseMenu");
    },
    getImg() {
      let loginData = JSON.parse(window.sessionStorage.getItem("token"));
      this.adminImg = loginData[0].image;
    },
    clickMenu(item) {
      console.log(item.label);
      if (item.name === "Login") {
        window.sessionStorage.clear();
        alert(item.label);
        this.$message({
          message: "成功退出登录",
          type: "success",
        });
      }
      this.$router.push({
        name: item.name,
      });
      this.$store.commit("selectMenu", item);
    },
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabList,
    }),
  },
  mounted() {
    this.getImg();
  },
};
</script>

<style>
.header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}

.l-content {
  margin: -10px;
  display: flex;
  align-items: center;
}

.l-content h2 {
  margin-left: 12px;
  margin-right: 12px;
  float: left;
  font-size: 22px;
  color: #fff;
}

.r-content .user_picture {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.el-breadcrumb__item:last-child .el-breadcrumb__inner,
.el-breadcrumb__item:last-child .el-breadcrumb__inner a,
.el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover,
.el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
  color: #fff;
}

.el-breadcrumb__inner a,
.el-breadcrumb__inner.is-link {
  color: #aaa;
}
</style>
