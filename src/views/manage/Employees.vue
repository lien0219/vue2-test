<template>
  <div class="employess">
    <search-bar
      :placeholder="placeholder"
      @onAdd="addButton"
      @onSearch="serach"
      @onShowAll="getList"
      ref="searchBar"
    />
    <div class="tabel">
      <template>
        <el-table
          :data="
            employeesTabel.slice(
              (currentPage - 1) * PageSize,
              currentPage * PageSize
            )
          "
          border
          style="width: 100%"
        >
          <el-table-column fixed prop="id" label="员工号" width="150">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="200">
          </el-table-column>
          <el-table-column prop="sex" label="性别" width="120">
          </el-table-column>
          <el-table-column prop="age" label="年龄" width="120">
          </el-table-column>
          <el-table-column prop="department" label="部门" width="200">
          </el-table-column>
          <el-table-column prop="date" label="入职时间" width="250">
          </el-table-column>
          <el-table-column prop="address" label="地址" width="300">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button
                @click="editButton(scope.row)"
                type="primary"
                icon="el-icon-edit"
                size="small"
                >编辑</el-button
              >
              <el-button
                @click="del(scope.row)"
                type="danger"
                icon="el-icon-delete"
                size="small"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <div class="page">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="PageSize"
        :page-sizes="PageSizes"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      >
      </el-pagination>
    </div>

    <!-- 添加/编辑对话框 -->
    <el-dialog
      :title="operateType === 'add' ? '新增员工' : '更新员工'"
      :visible.sync="dialogAddEdit"
    >
      <el-form :model="employeesData" :rules="rules" ref="employeesData">
        <el-form-item label="员工号" prop="id" :label-width="formLabelWidth">
          <el-input
            v-model="employeesData.id"
            placeholder="员工号默认自增,无须添加"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="名字" prop="name" :label-width="formLabelWidth">
          <el-input v-model="employeesData.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex" :label-width="formLabelWidth">
          <el-select v-model="employeesData.sex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" prop="age" :label-width="formLabelWidth">
          <el-input v-model="employeesData.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="部门"
          prop="department"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="employeesData.department"
            placeholder="请选择部门"
          >
            <el-option label="行政部" value="行政部"></el-option>
            <el-option label="财务部" value="财务部"></el-option>
            <el-option label="人事部" value="人事部"></el-option>
            <el-option label="研发部" value="研发部"></el-option>
            <el-option label="营销部" value="营销部"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="入职时间"
          prop="date"
          :label-width="formLabelWidth"
        >
          <el-input
            type="date"
            v-model="employeesData.date"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address" :label-width="formLabelWidth">
          <el-input
            v-model="employeesData.address"
            placeholder="请以“xx省-xx市-xx区/县”的格式输入员工地址"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button
          type="primary"
          :plain="true"
          @click="onSubmit('employeesData')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import SearchBar from "../../components/SearchBar.vue";

export default {
  name: "Employees",
  data() {
    return {
      placeholder: "请输入员工名字查询",
      dialogAddEdit: false,
      operateType: "add",
      employeesTabel: [],
      employeesData: {
        id: "",
        name: "",
        sex: "",
        age: "",
        department: "",
        date: "",
        address: "",
      },
      rules: {
        name: [
          { required: true, message: "名字不能为空", trigger: "blur" },
          { min: 2, max: 12, message: "名字长度为2-12位", trigger: "blur" },
        ],
        sex: [{ required: true, message: "性别不能为空", trigger: "blur" }],
        age: [
          { required: true, message: "年龄不能为空", trigger: "blur" },
          { min: 2, max: 2, message: "年龄为2位", trigger: "blur" },
        ],
        department: [
          { required: true, message: "部门不能为空", trigger: "blur" },
        ],
        date: [
          { required: true, message: "入职日期不能为空", trigger: "blur" },
        ],
        address: [
          { required: true, message: "地址不能为空", trigger: "blur" },
          { min: 6, max: 30, message: "地址长度为6-30位", trigger: "blur" },
        ],
      },
      keywords: "",
      formLabelWidth: "100px",
      currentPage: 1,
      totalCount: 1,
      PageSize: 10,
      PageSizes: [5, 10, 20, 50],
    };
  },
  components: {
    SearchBar,
  },
  methods: {
    getList() {
      this.$axios.get("/employees/getData").then((res) => {
        console.log(res);
        const { code, data } = res.data;
        if (code === 200) {
          this.totalCount = data.total;
          this.employeesTabel = data.employeesList;
        }
      });
    },
    addinit() {
      this.employeesData = {
        id: "",
        name: "",
        sex: "",
        age: "",
        department: "",
        date: "",
        address: "",
      };
    },
    addButton() {
      this.addinit();
      this.operateType = "add";
      this.dialogAddEdit = true;
    },
    editButton(row) {
      this.employeesData = row;
      this.operateType = "edit";
      this.dialogAddEdit = true;
    },
    cancel() {
      this.$message({
        message: "操作取消",
        type: "info",
      });
      this.getList();
      this.dialogAddEdit = false;
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.operateType === "add") {
            this.add();
          } else {
            this.edit();
          }
          this.dialogAddEdit = false;
          console.log("success submit!!");
        } else {
          console.log("error submit!!");
        }
      });
    },
    add() {
      this.$axios
        .post("/employees/add", {
          params: {
            employeesData: this.employeesData,
          },
        })
        .then((res) => {
          console.log(res);
          const { code, message } = res.data;
          if (code === 200) {
            this.getList();
            this.$message({
              message: message,
              type: "success",
            });
          } else {
            this.$message({
              type: "info",
              message: message,
            });
          }
        });
    },
    serach() {
      var keywords = this.$refs.searchBar.keywords;
      console.log(keywords);
      this.$axios
        .post("/employees/search", {
          params: { keywords: keywords },
        })
        .then((res) => {
          console.log(res);
          const { code, message, data } = res.data;
          if (code === 200) {
            this.totalCount = data.total;
            this.employeesTabel = data.searchList;
            this.$message({
              type: "success",
              message: message,
            });
          } else {
            this.getList();
            this.$message({
              type: "info",
              message: message,
            });
          }
        });
    },
    edit() {
      this.$axios
        .post("/employees/edit", {
          params: {
            employeesData: this.employeesData,
          },
        })
        .then((res) => {
          console.log(res);
          const { code, message } = res.data;
          if (code === 200) {
            this.getList();
            this.$message({
              message: message,
              type: "success",
            });
          } else {
            this.$message({
              type: "info",
              message: "编辑操作失败",
            });
          }
        });
    },
    del(row) {
      this.$confirm("此操作将永久删除该员工, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .post("/employees/del", {
              params: { id: row.id },
            })
            .then((res) => {
              console.log(res);
              const { code, message } = res.data;
              if (code === 200) {
                this.getList();
                this.$message({
                  type: "success",
                  message: message,
                });
              } else {
                this.$message({
                  type: "info",
                  message: message,
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除员工！",
          });
        });
    },
    // 分页
    // 每页要显示的条数
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.PageSize = val;
      this.currentPage = 1;
      this.getList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
  },
  mounted() {
    this.getList();
  },
};
</script>

<style scoped>
.page {
  float: right;
  height: 50px;
  margin: 15px;
}
</style>
