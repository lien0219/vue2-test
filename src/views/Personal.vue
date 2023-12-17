<template>
  <div>
    <el-row>
      <!-- 个人信息卡 -->
      <el-col :span="9">
        <el-card shadow="hover">
          <div class="admin">
            <img class="admin_picture" :src="adminImg" />
            <div class="admin_info">
              <p class="name">{{ name }}</p>
              <p class="pwd"><i>密码:</i>{{ password }}</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="15">
        <el-card shadow="hover">
          <div style="width: 100%; height: 230px" ref="people"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card shadow="hover">
          <div style="width: 100%; height: 300px" ref="cost"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card shadow="hover">
          <div style="width: 100%; height: 250px" ref="week"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "Personal",
  data() {
    return {
      adminImg: "",
      name: "",
      password: "",
    };
  },
  methods: {
    getAdmin() {
      let loginData = JSON.parse(window.sessionStorage.getItem("token"));
      this.adminImg = loginData[0].image;
      this.name = loginData[0].name;
      this.password = loginData[0].password;
    },
  },
  mounted() {
    this.getAdmin();
    this.$axios.get("/home/getData").then((res) => {
      const { code, data } = res.data;
      if (code === 200) {
        const cost = data.costData;
        const xData = cost.date;
        const keyArray = Object.keys(cost.data[0]);
        const series = [];
        keyArray.forEach((key) => {
          series.push({
            name: key,
            data: cost.data.map((item) => item[key]),
            type: "line",
          });
        });

        // 折线图
        const costOption = {
          title: {
            text: "2021年各部门每月消费金额",
          },
          tooltip: {},
          legend: {
            data: keyArray,
          },
          xAxis: {
            data: xData,
          },
          yAxis: {},
          series,
        };
        const Line = echarts.init(this.$refs.cost);
        Line.setOption(costOption);

        //柱状图
        const weekOption = {
          title: {
            text: "上周公司收入详情",
          },
          tooltip: {},
          legend: {
            data: ["收入(元)"],
          },
          xAxis: {
            data: data.weekData.map((item) => item.date),
          },
          yAxis: {},
          series: [
            {
              name: "收入(元)",
              data: data.weekData.map((item) => item.value),
              type: "bar",
            },
          ],
        };
        const Bar = echarts.init(this.$refs.week);
        Bar.setOption(weekOption);

        //饼图
        const peopleOption = {
          title: {
            text: "公司人数分布情况(人)",
          },
          tooltip: {},
          series: [
            {
              type: "pie",
              data: data.peopleData,
            },
          ],
        };
        const Pie = echarts.init(this.$refs.people);
        Pie.setOption(peopleOption);
      }
      console.log(res);
    });
  },
};
</script>

<style scoped>
@import "../assets/css/personal.css";
</style>
