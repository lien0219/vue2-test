<template>
  <div>
    <el-table :data="list">
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="study" label="学科"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="transmitClick(scope.row)">传递</el-button>
        </template>
      </el-table-column>
    </el-table>
    <ChildView :is-show="isOpen" :row="row"></ChildView>
  </div>
</template>
<script>
import ChildView from "./SonAndGrandchild/child";
export default {
  components: {
    ChildView,
  },
  data() {
    return {
      isOpen: false,
      row: {},
      list: [
        { name: "王丽", study: "Java" },
        { name: "李克", study: "Python" },
      ],
    };
  },
  methods: {
    // 传递事件
    transmitClick(row) {
      this.isOpen = true;
      this.row = row;
      // console.log(row);
    },
  },
};
</script>
