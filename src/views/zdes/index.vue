<template>
  <div class="hello">
    <el-row class="table-grid-content">
      <el-col :span="18" class="grid">
        <el-input v-model="input" placeholder="请输入搜索内容"></el-input>
      </el-col>
      <el-col :span="3" class="grid" :gutter="1">
        <el-button type="success" icon="el-icon-search">搜索</el-button>
      </el-col>
      <el-col :span="2" class="grid" :gutter="15">
        <el-button type="primary" @click="addMembers()">增加</el-button>
      </el-col>
    </el-row>

    <el-table :data="tables" :stripe="true" :border="true" width="100%">
      <el-table-column label="id" prop="id"></el-table-column>
      <el-table-column label="日期" prop="date"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="地址" prop="address"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="modifyData(scope.$index, scope.row)"
            >修改</el-button
          >
          <el-button type="danger" @click="deleteData(scope.$index, tableData)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="centerDialogVisible">
      <el-form :model="editForm">
        <el-form-item label="日期" :picker-options="pickerOptions">
          <el-date-picker
            v-model="editForm.date"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="editForm.address"></el-input>
        </el-form-item>
      </el-form>
      <div>
        <el-button @click="closeDialog()">取消</el-button>
        <el-button type="primary" @click="sumbitEditRow()">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="isAddMembers">
      <el-form :model="addForm">
        <el-form-item label="日期" :picker-options="pickerOptions">
          <el-date-picker
            v-model="addForm.date"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="addForm.address"></el-input>
        </el-form-item>
      </el-form>
      <div>
        <el-button @click="closeDialog()">取消</el-button>
        <el-button type="primary" @click="sumbitAddRow()">确定</el-button>
      </div>
    </el-dialog>
    <el-input v-model="id" placeholder="请输入查询的ID号"></el-input>
  </div>
</template>
<script>
var _index;
export default {
  data() {
    return {
      centerDialogVisible: false,
      isAddMembers: false,
      editForm: [],
      addForm: [],
      searchData: "",
      input: "",
      id: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      tableData: [
        {
          date: "2020-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          id: 2,
        },
        {
          date: "2020-05-04",
          name: "王大虎",
          address: "上海市普陀区金沙江路 1517 弄",
          id: 5,
        },
        {
          date: "2020-05-01",
          name: "王中虎",
          address: "上海市普陀区金沙江路 1519 弄",
          id: 7,
        },
        {
          date: "2020-05-03",
          name: "王全虎",
          address: "上海市普陀区金沙江路 1516 弄",
          id: 7,
        },
        {
          date: "2020-05-04",
          name: "王大虎",
          address: "上海市普陀区金沙江路 1517 弄",
          id: 0,
        },
      ],
    };
  },
  methods: {
    deleteData(index, row) {
      this.tableData.splice(index, 1);
    },
    modifyData(index, row) {
      this.centerDialogVisible = true;
      this.editForm = Object.assign({}, row); //重置对象
      _index = index;
    },
    sumbitEditRow() {
      var editData = _index;
      this.tableData[editData].name = this.editForm.name;
      this.tableData[editData].date = this.editForm.date;
      this.tableData[editData].address = this.editForm.address;
      this.centerDialogVisible = false;
    },
    closeDialog() {
      this.centerDialogVisible = false;
      this.isAddMembers = false;
    },
    addMembers() {
      this.isAddMembers = true;
      this.addForm = {
        name: "",
        date: "",
        address: "",
      };
    },
    sumbitAddRow() {
      this.tableData = this.tableData || [];
      this.tableData.push({
        name: this.addForm.name,
        date: this.addForm.date,
        address: this.addForm.address,
      });
      this.isAddMembers = false;
    },
  },
  computed: {
    tables() {
      const input = this.input;
      if (input) {
        console.log(this.input);
        return this.tableData.filter((data) => {
          console.log(data, "data");
          return Object.keys(data).some((key) => {
            console.log(key, "key");
            return String(data[key]).toLowerCase().indexOf(input) > -1;
          });
        });
      }
      return this.tableData;
    },
  },
};
</script>
<style scoped>
.table-grid-content {
  border-radius: 4px;
  height: 50 px;
  background: #ebeef5;
  padding: 10px;
}
</style>
