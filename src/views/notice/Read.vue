<template>
  <div>
    <div v-for="item in readList" :key="item.index" class="event">
      <div class="content">
        <div class="title">
          <i @click="isShow(item)">{{ item.title }}</i>
        </div>
        <div class="paragraph">
          {{ item.paragraph }}
        </div>
      </div>
      <div class="right">
        <el-button @click="del(item.index)" icon="el-icon-delete-solid">
        </el-button>
        <div class="date">
          {{ item.date }}
        </div>
      </div>
    </div>

    <!-- 阅读详情对话框 -->
    <el-dialog title="通知" :visible.sync="dialogDetail">
      <el-form :model="readData">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <span>{{ readData.title }}</span>
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth">
          <span>{{ readData.paragraph }}</span>
        </el-form-item>
        <el-form-item label="日期" :label-width="formLabelWidth">
          <span>{{ readData.date }}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogDetail = false">我已阅读</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Read",
  data() {
    return {
      dialogDetail: false,
      readList: [],
      readData: {
        title: "",
        paragraph: "",
        date: "",
      },
      formLabelWidth: "100px",
    };
  },
  methods: {
    getList() {
      this.$axios.get("/notice/getReadData").then((res) => {
        const { code, data } = res.data;
        if (code === 200) {
          this.readList = data.readList;
        }
        console.log(res);
      });
    },
    del(index) {
      this.$confirm("此操作将永久删除该通知, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .post("/notice/del", {
              params: { index: index },
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
            message: "已取消删除通知信息！",
          });
        });
    },
    isShow(item) {
      (this.readData = item), (this.dialogDetail = true);
    },
  },
  mounted() {
    this.getList();
  },
};
</script>

<style scoped>
@import "../../assets/css/notice.css";
</style>
