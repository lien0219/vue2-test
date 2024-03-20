<template>
  <div class="service-asset-management--wrapper">
    <el-table border :loading="tableLoading" :data="tableData" row-key="id">
      <el-table-column label="序号" width="50" align="center">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="部件名称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="code"
        label="部件编码"
        align="center"
      ></el-table-column>
      <el-table-column prop="floorRange" label="是否显示" align="center">
        <template slot-scope="scope">
          <el-select
            size="mini"
            v-model="scope.row.floorRange"
            @change="display"
          >
            <el-option
              v-for="item in displayOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableLoading: false,
      tableData: [
        {
          name: "haha",
          code: 66,
          floorRange: [], //是否显示
        },
        {
          name: "hehe",
          code: 77,
          floorRange: [],
        },
        {
          name: "hihi",
          code: 88,
          floorRange: [],
        },
      ],
      displayOptions: [
        {
          value: "0",
          label: "消费券",
        },
        {
          value: "1",
          label: "权益券",
        },
        {
          value: "2",
          label: "体验券",
        },
      ],
    };
  },
  methods: {
    display(value) {
      console.log(value);
    },
  },
};
</script>
<style scoped></style>
