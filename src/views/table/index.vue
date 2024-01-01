<template>
  <div id="app">
    <el-card class="box-card">
      <!-- 查询内容 -->
      <div slot="header" class="clearfix">
        <el-form
          size="small"
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
        >
          <el-form-item label="收货人">
            <el-input v-model="formInline.user" placeholder="收货人"></el-input>
          </el-form-item>
          <el-form-item label="订单状态">
            <el-select v-model="formInline.status" placeholder="订单状态">
              <el-option label="未受理" value="未受理"></el-option>
              <el-option label="已受理" value="已受理"></el-option>
              <el-option label="已送达" value="已送达"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              v-model="formInline.time"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
            ></el-date-picker>
          </el-form-item>
          <!-- 查询 -->
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
          <!-- 新增 -->
          <el-form-item>
            <el-button
              type="primary"
              size="small"
              @click="dialogFormVisible = true"
              >添加新记录</el-button
            >
            <el-dialog :visible.sync="dialogFormVisible">
              <el-form
                size="small"
                style="width: 450px"
                label-width="100px"
                :model="form"
              >
                <el-form-item label="收货人">
                  <el-input
                    style="width: 280px; margin-left: -80px"
                    v-model="form.user"
                    placeholder="收货人"
                  ></el-input>
                </el-form-item>
                <el-form-item label="订单状态">
                  <el-select
                    style="width: 280px; margin-left: -80px"
                    v-model="form.status"
                    placeholder="订单状态"
                  >
                    <el-option label="未发货" value="未受理"></el-option>
                    <el-option label="已受理" value="已受理"></el-option>
                    <el-option label="已送达" value="已送达"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="下单时间">
                  <el-date-picker
                    style="width: 280px; margin-left: -80px"
                    v-model="form.time"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期时间"
                  ></el-date-picker>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogFormVisible = false"
                  >取 消</el-button
                >
                <el-button size="small" type="primary" @click="addNew"
                  >确 定</el-button
                >
              </div>
            </el-dialog>
          </el-form-item>
        </el-form>
      </div>
      <!-- 表格 -->
      <div>
        <el-table :data="tableData" height="250" border style="width: 100%">
          <el-table-column
            prop="time"
            label="日期"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="user"
            label="收货人"
            width="180"
          ></el-table-column>
          <el-table-column prop="status" label="订单状态"></el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)"
                >编辑</el-button
              >
              <el-dialog :visible.sync="editFormVisiable">
                <el-form
                  size="small"
                  style="width: 500px"
                  label-width="100px"
                  :model="editForm"
                >
                  <el-form-item label="收货人">
                    <el-input
                      style="width: 300px"
                      v-model="editForm.user"
                      placeholder="收货人"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="订单状态">
                    <el-select
                      style="width: 300px"
                      v-model="editForm.status"
                      placeholder="订单状态"
                    >
                      <el-option label="未发货" value="未受理"></el-option>
                      <el-option label="已受理" value="已受理"></el-option>
                      <el-option label="已送达" value="已送达"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="下单时间">
                    <el-date-picker
                      style="width: 300px"
                      v-model="editForm.time"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      type="datetime"
                      placeholder="选择日期时间"
                    ></el-date-picker>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button size="small" @click="editFormVisiable = false"
                    >取 消</el-button
                  >
                  <el-button
                    size="small"
                    :plain="true"
                    type="primary"
                    @click="submitEdit"
                    >确 定</el-button
                  >
                </div>
              </el-dialog>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[3, 5, 7, 10, 20]"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1, //当前页
      pageSize: 3, //每页条数
      total: 0, //总条数
      // 日期时间
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      // 渲染表格数据
      tableData: [],
      list: [], //存入本地记录
      // 新增表单
      form: {
        user: "",
        status: [],
        time: "",
      },
      dialogFormVisible: false, //新增弹框
      editFormVisiable: false, //编辑弹框
      // 编辑表单
      editForm: {
        user: "",
        status: [],
        time: "",
      },
      rowItem: {}, // 编辑每项内容
      // 初始查询表单
      formInline: {
        user: "",
        status: [],
        time: [],
      },
      // 查询表单
      searchForm: {
        user: "",
        status: [],
        time: [],
      },
      searchData: [], //查询到的数据
    };
  },
  methods: {
    // 渲染数据
    showList() {
      if (JSON.parse(window.localStorage.getItem("list"))) {
        this.list = JSON.parse(window.localStorage.getItem("list"));
        this.tableData = [...this.list]; //渲染数组
        this.total = this.list.length; //数据总条数
        this.changePage(this.list); //进入页面返回到第一页
      }
    },
    // 当前页
    handleCurrentChange(val) {
      this.currentPage = val; //当前页
      //如果查询数据存在，则渲染查询数据
      if (this.searchData.length) {
        this.changePage(this.searchData);
      } else {
        this.changePage(this.list); //不存在则渲染全部数据
      }
    },
    // 分页显示
    changePage(obj) {
      const n = (this.currentPage - 1) * this.pageSize; //需要跳过的条数
      this.tableData = obj.slice(n, n + this.pageSize);
    },
    // 增加
    addNew() {
      this.list.unshift(this.form);
      this.list.sort((a, b) => {
        return new Date(b.time).getTime() - new Date(a.time).getTime();
      }); //降序
      window.localStorage.setItem("list", JSON.stringify(this.list));
      this.form = {};
      this.dialogFormVisible = false;
      this.showList();
    },
    // 删除
    handleDelete(row) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.list.splice(this.list.indexOf(row), 1);
          window.localStorage.setItem("list", JSON.stringify(this.list));
          this.currentPage = 1;
          this.showList();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 编辑
    handleEdit(row) {
      this.editFormVisiable = true;
      this.rowItem = row;
      this.editForm = { ...row };
    },
    // 确认编辑
    submitEdit() {
      this.editFormVisiable = false;
      this.list[this.list.indexOf(this.rowItem)] = this.editForm;
      this.list.sort((a, b) => {
        return new Date(b.time).getTime() - new Date(a.time).getTime();
      }); //降序
      window.localStorage.setItem("list", JSON.stringify(this.list));
      this.showList();
      this.$message({
        message: "恭喜你，修改成功",
        type: "success",
      });
    },
    // 查询
    onSubmit() {
      this.currentPage = 1; //回到第一页
      this.searchData = []; //初始化搜索数据
      this.searchForm = { ...this.formInline };
      if (this.searchForm.user) {
        //如果搜索对象中user存在
        this.searchData = this.list.filter((item) =>
          /*
        match方法是字符串对象的一个方法，用于检索字符串中是否存在与指定的正则表达式匹配的内容。
        它接受一个正则表达式作为参数，并返回一个包含匹配结果的数组。如果没有找到匹配的内容，则返回null。

item.user.match(this.searchForm.user)检查item.user字符串是否与this.searchForm.user中的正则表达式匹配。
如果匹配成功，则返回一个包含匹配结果的数组，否则返回null
        */
          item.user.match(this.searchForm.user)
        );
        this.total = this.searchData.length;
        this.changePage(this.searchData);
        if (this.searchForm.status) {
          //如果搜索对象中status存在
          this.searchStatus(this.searchData);
          if (this.searchForm.time && this.searchForm.time.length) {
            //如果搜索对象中time存在
            this.searchTime(this.searchData);
          }
        } else if (this.searchForm.time && this.searchForm.time.length) {
          //如果搜索对象中time存在
          this.searchTime(this.searchData);
        }
      } else if (this.searchForm.status) {
        //如果搜索对象中status存在
        this.searchStatus(this.list);
        if (this.searchForm.time && this.searchForm.time.length) {
          //如果搜索对象中time存在
          this.searchTime(this.searchData);
        }
      } else if (this.searchForm.time && this.searchForm.time.length) {
        //如果搜索对象中time存在
        this.searchTime(this.list);
      } else {
        //如果搜索对象为空
        this.showList();
      }
      this.formInline = {};
    },
    // 查询状态
    searchStatus(obj) {
      this.searchData = obj.filter((item) =>
        item.status.match(this.searchForm.status)
      );
      this.total = this.searchData.length; //搜索结果数据总条数
      this.changePage(this.searchData); //传入渲染
    },
    // 查询时间
    searchTime(obj) {
      let beforeTime = new Date(this.searchForm.time[0]).getTime(); //查询时间范围下限
      let afterTime = new Date(this.searchForm.time[1]).getTime(); //查询时间范围上限
      this.searchData = obj.filter(
        (item) =>
          beforeTime <= new Date(item.time).getTime() &&
          new Date(item.time).getTime() <= afterTime
      );
      this.total = this.searchData.length; //搜索数据总条数
      this.changePage(this.searchData); //传入渲染
    },
  },
  created() {
    this.showList();
  },
};
</script>
<style scoped>
.box-card {
  width: 800px;
  margin: 40px auto;
}
.el-dialog {
  width: 40% !important;
}
</style>
