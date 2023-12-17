<template>
  <div style="background-color: #739bd7; padding: 20px">
    <Child ref="child"></Child>
    <Child2 ref="child2"></Child2>
    <el-button type="primary" @click="handleClick">调用子组件的方法</el-button>
    <el-button type="primary" @click="handleClick2"
      >调用子组件2的方法</el-button
    >
  </div>
</template>
<script>
import Child from "./child.vue";
import Child2 from "./child2";

export default {
  components: {
    Child,
    Child2,
  },
  data() {
    return {};
  },
  methods: {
    handleClick() {
      this.$refs.child.sing();
    },
    handleClick2() {
      this.$refs.child2.$emit("childmethods");
    },
  },
};
</script>
