<template>
  <el-card>
    <el-button type="success" @click="handleOpen('/menu')">3D菜单</el-button>
    <el-button type="success" @click="handleOpen('/main')"
      >3D城市展示</el-button
    >
  </el-card>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleOpen(address) {
      this.$router.push({ path: address });
    },
  },
};
</script>
<style scoped></style>
