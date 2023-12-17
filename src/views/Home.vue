<template>
  <div>
    <el-row>
      <!-- 左侧 -->
      <el-col :span="10">
        <div class="clock">
          <el-card shadow="hover">
            <clock-bar />
          </el-card>
        </div>
        <div>
          <el-card shadow="hover" class="box-card">
            <div slot="header" class="clearfix">
              <span>通知</span>
              <el-button
                @click="notice()"
                style="float: right; padding: 3px 0"
                type="text"
                >通知详情</el-button
              >
            </div>
            <div v-for="item in noticeData" :key="item.index" class="text item">
              <div class="title">
                <div class="point"></div>
                {{ item.title }}
              </div>
              <div class="date">
                {{ item.date }}
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
      <!-- 右侧 -->
      <el-col :span="14">
        <div class="card">
          <el-card
            v-for="item in incomeData"
            :key="item.index"
            shadow="hover"
            class="income"
          >
            <div class="border" :style="{ background: item.color }">
              <h1>{{ item.time }}</h1>
            </div>
            <div class="detail">
              <p class="annotation">销售金额(元)</p>
              <p class="money">${{ item.money }}</p>
            </div>
          </el-card>
        </div>
        <div>
          <el-card shadow="hover">
            <div class="cost">
              <h3>各部门六月份费用明细</h3>
            </div>
            <el-table :data="departmentData" style="width: 100%">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form
                    label-position="left"
                    inline
                    class="demo-table-expand"
                  >
                    <el-form-item label="部门名称">
                      <span>{{ props.row.department }}</span>
                    </el-form-item>
                    <el-form-item label="部门经理">
                      <span>{{ props.row.manager }}</span>
                    </el-form-item>
                    <el-form-item label="部门人数">
                      <span>{{ props.row.number_people }}</span>
                    </el-form-item>
                    <el-form-item label="办公费">
                      <span>{{ props.row.office_cost }}</span>
                    </el-form-item>
                    <el-form-item label="交通费">
                      <span>{{ props.row.traffic_cost }}</span>
                    </el-form-item>
                    <el-form-item label="加班费">
                      <span>{{ props.row.overtime_cost }}</span>
                    </el-form-item>
                    <el-form-item label="工资费用">
                      <span>{{ props.row.salary_cost }}</span>
                    </el-form-item>
                    <el-form-item label="其他费用">
                      <span>{{ props.row.other_cost }}</span>
                    </el-form-item>
                    <el-form-item label="总费用">
                      <span>{{ props.row.all_costs }}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column label="部门" prop="department">
              </el-table-column>
              <el-table-column label="经理" prop="manager"> </el-table-column>
              <el-table-column label="总费用" prop="all_costs">
              </el-table-column>
            </el-table>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ClockBar from "../components/ClockBar.vue";

export default {
  name: "Home",
  data() {
    return {
      noticeData: [],
      incomeData: [],
      departmentData: [],
    };
  },
  components: {
    ClockBar,
  },
  methods: {
    notice() {
      console.log("通知");
      this.$router.push("/notice");
    },
  },
  mounted() {
    this.$axios.get("/home/getData").then((res) => {
      const { code, data } = res.data;
      if (code === 200) {
        this.incomeData = data.incomeData;
        this.departmentData = data.departmentData;
      }
      console.log(res);
    }),
      this.$axios.get("/notice/getData").then((res) => {
        const { code, data } = res.data;
        if (code === 200) {
          this.noticeData = data.noticeList;
        }
        console.log(res);
      });
  },
};
</script>

<style scoped>
@import "../assets/css/home.css";
</style>
