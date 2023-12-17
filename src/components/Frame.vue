<template>
  <el-container>
    <el-header>
      <common-header />
    </el-header>
    <el-container>
      <el-aside width="auto">
        <common-aside />
      </el-aside>
      <el-main>
        <common-tag />
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonHeader from "./CommonHeader.vue";
import CommonAside from "./CommonAside.vue";
import CommonTag from "./CommonTag.vue";

export default {
  name: "Frame",
  data() {
    return {};
  },
  components: {
    CommonHeader,
    CommonAside,
    CommonTag,
  },
};
</script>

<style scoped>
.el-container {
  height: 100%;
}

.el-container .el-header {
  height: 10%;
}

.el-container .el-container {
  height: 90%;
}

.el-header {
  background-color: #242f42;
}

.el-main {
  padding-top: 0;
  background-color: #f0f0f0;
}
</style>
