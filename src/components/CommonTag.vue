<template>
  <div class="tabs">
    <el-tag
      v-for="(tag, index) in tags"
      :key="tag.name"
      :closable="tag.name !== 'Home'"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
      @click="changeMenu(tag)"
      @close="handleClose(tag, index)"
      size="small"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "CommonTag",
  data() {
    return {};
  },
  methods: {
    ...mapMutations({
      close: "closeTag",
    }),
    changeMenu(item) {
      this.$router.push({
        name: item.name,
      });
    },
    handleClose(tag, index) {
      const length = this.tags.length - 1;
      this.close(tag);
      if (tag.name !== this.$route.name) {
        return;
      }
      if (index === length) {
        this.$router.push({
          name: this.tags[index - 1].name,
        });
      } else {
        this.$router.push({
          name: this.tags[index].name,
        });
      }
    },
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabList,
    }),
  },
};
</script>

<style scoped>
.tabs {
  padding: 5px;
  margin: 0 -20px 10px -20px;
  background-color: #fff;
}

.tabs .el-tag {
  margin-right: 10px;
  cursor: pointer;
}
</style>
