<template>
  <div>
    <div v-for="item in unReadList" :key="item.index" class="event">
      <div class="content">
        <div class="title">
          <i @click="isShow(item)">{{ item.title }}</i>
        </div>
        <div class="paragraph">
          {{ item.paragraph }}
        </div>
      </div>
      <div class="right">
        <el-button @click="remove(item)" icon="el-icon-message-solid">
        </el-button>
        <div class="date">
          {{ item.date }}
        </div>
      </div>
    </div>

    <!-- 阅读详情对话框 -->
    <el-dialog title="通知" :visible.sync="dialogDetail">
      <el-form :model="unReadData">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <span>{{ unReadData.title }}</span>
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth">
          <span>{{ unReadData.paragraph }}</span>
        </el-form-item>
        <el-form-item label="日期" :label-width="formLabelWidth">
          <span>{{ unReadData.date }}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="remove(unReadData)">标记为已读</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "UnRead",
  data() {
    return {
      dialogDetail: false,
      unReadList: [],
      unReadData: {
        title: "",
        paragraph: "",
        date: "",
      },
      formLabelWidth: "100px",
    };
  },
  methods: {
    getList() {
      this.$axios.get("/notice/getUnReadData").then((res) => {
        const { code, data } = res.data;
        if (code === 200) {
          this.unReadList = data.unReadList;
        }
        console.log(res);
      });
    },
    remove(noticeData) {
      this.$axios
        .post("/notice/remove", {
          params: { noticeData: noticeData },
        })
        .then((res) => {
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
          console.log(res);
        });
      this.dialogDetail = false;
    },
    isShow(item) {
      (this.unReadData = item), (this.dialogDetail = true);
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
