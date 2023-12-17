<template>
  <div class="admin">
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
            adminTabel.slice(
              (currentPage - 1) * PageSize,
              currentPage * PageSize
            )
          "
          border
          style="width: 100%"
        >
          <el-table-column fixed prop="id" label="id号" width="200">
          </el-table-column>
          <el-table-column label="头像" prop="image">
            <template slot-scope="scope">
              <img :src="scope.row.image" min-width="70" height="70" />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="账号" width="250">
          </el-table-column>
          <el-table-column prop="password" label="密码" width="250">
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
      :title="operateType === 'add' ? '新增管理员' : '更新管理员'"
      :visible.sync="dialogAddEdit"
    >
      <el-form :model="adminData" :rules="rules" ref="adminData">
        <el-form-item label="id号" prop="id" :label-width="formLabelWidth">
          <el-input
            v-model="adminData.id"
            placeholder="id号默认自增,无须添加"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item
          label="上传头像"
          prop="image"
          :label-width="formLabelWidth"
        >
          <el-input v-model="adminData.image" v-if="false"></el-input>
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            action="/admin/upload"
            :before-upload="beforeUpload"
            :on-change="handleChange"
            :auto-upload="false"
            :data="adminData"
          >
            <img v-if="adminData.image" :src="adminData.image" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="账号" prop="name" :label-width="formLabelWidth">
          <el-input
            v-model="adminData.name"
            placeholder="请输入账号"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="adminData.password"
            type="password"
            placeholder="请输入密码"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" :plain="true" @click="onSubmit('adminData')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import SearchBar from "../../components/SearchBar.vue";

export default {
  name: "Admin",
  data() {
    return {
      placeholder: "请输入账号查询",
      dialogAddEdit: false,
      operateType: "add",
      adminTabel: [],
      adminData: {
        id: "",
        image: "",
        name: "",
        password: "",
      },
      rules: {
        image: [{ required: true, message: "头像不能为空", trigger: "blur" }],
        name: [
          { required: true, message: "账号不能为空", trigger: "blur" },
          { min: 4, max: 10, message: "账号为4-10位", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 4, max: 12, message: "密码长度为4-12位", trigger: "blur" },
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
    // 上传头像
    handleChange(file) {
      this.adminData.image = URL.createObjectURL(file.raw);
    },
    beforeUpload(file) {
      console.log(file);
      return true;
    },
    getList() {
      this.$axios.get("/admin/getData").then((res) => {
        console.log(res);
        const { code, data } = res.data;
        if (code === 200) {
          this.totalCount = data.total;
          this.adminTabel = data.adminList;
        }
      });
    },
    addinit() {
      this.adminData = {
        id: "",
        image: "",
        name: "",
        password: "",
      };
    },
    addButton() {
      this.addinit();
      this.operateType = "add";
      this.dialogAddEdit = true;
    },
    editButton(row) {
      this.adminData = row;
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
        .post("/admin/add", {
          params: {
            adminData: this.adminData,
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
        .post("/admin/search", {
          params: { keywords: keywords },
        })
        .then((res) => {
          console.log(res);
          const { code, message, data } = res.data;
          if (code === 200) {
            this.totalCount = data.total;
            this.adminTabel = data.searchList;
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
        .post("/admin/edit", {
          params: {
            adminData: this.adminData,
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
      this.$confirm("此操作将永久删除该管理员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .post("/admin/del", {
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
            message: "已取消删除管理员！",
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

input[type="file"] {
  display: none;
}

.avatar-uploader .el-upload {
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
