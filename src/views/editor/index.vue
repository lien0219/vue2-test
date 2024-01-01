<template>
  <div class="editor">
    <el-card shadow="never">
      <div slot="header" class="clearfix">
        <span>富文本编辑器</span>
      </div>
      <div class="card_center">
        <Editor :defaultText="defaultText" :richText.sync="richText" />
      </div>
    </el-card>
  </div>
</template>
<script>
import Editor from "./editor";
export default {
  components: {
    Editor,
  },
  data() {
    return {
      // 默认值
      defaultText: "",
      // 富文本更新的值
      richText: "",
    };
  },
  created() {
    // 等待组件加载完毕赋值
    this.$nextTick(() => {
      this.defaultText = `<p style="text-align: center; "><img src="https://img0.baidu.com/it/u=1110398131,3497243547&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800" width="30%" style="text-align: center; max-width: 100%;"></p>`;
    });
  },
};
</script>
<style scoped></style>
