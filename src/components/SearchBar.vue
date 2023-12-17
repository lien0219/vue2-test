<template>
  <div class="top">
    <div class="add">
      <el-button type="primary" @click="add" icon="el-icon-circle-plus-outline"
        >新增
      </el-button>
    </div>
    <div class="serach">
      <el-input
        :placeholder="placeholder"
        v-model="keywords"
        @keyup.enter.native="search"
        clearable
      >
      </el-input>
      <el-button type="primary" icon="el-icon-search" @click="search"
        >查询
      </el-button>
    </div>
    <div class="all">
      <el-button type="primary" @click="showAll">显示列表 </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      keywords: "",
    };
  },
  props: {
    placeholder: String,
  },
  methods: {
    //新增
    add() {
      this.$emit("onAdd");
    },
    // 搜索
    search() {
      this.$emit("onSearch");
    },
    // 显示所有员工
    showAll() {
      this.$emit("onShowAll");
    },
  },
};
</script>

<style scoped>
.top {
  display: flex;
  margin-bottom: 10px;
  justify-content: space-between;
}

.add {
  margin-right: 15px;
}

.serach {
  display: flex;
}

.serach .el-input {
  margin-right: 15px;
}

.all {
  margin-left: auto;
}
</style>
