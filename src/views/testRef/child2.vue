<template>
  <div style="background-color: #e0dd86">我是子组件2--$emit\$on</div>
</template>
<script>
export default {
  data() {
    return {};
  },
  // methods: {
  //   sing() {
  //     console.log("我是子组件2方法");
  //   },
  // },
  mounted() {
    this.$nextTick(() => {
      this.$on("childmethods", () => {
        console.log("我是子组件2方法");
      });
    });
  },
};
</script>
