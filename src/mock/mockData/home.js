// mock数据模拟
import Mock from "mockjs";

// 图表数据
let List = [];
export default {
  getHomeData: () => {
    for (let i = 0; i < 12; i++) {
      List.push(
        Mock.mock({
          行政部: Mock.Random.float(50000, 250000, 0, 0),
          财务部: Mock.Random.float(50000, 250000, 0, 0),
          人事部: Mock.Random.float(50000, 250000, 0, 0),
          研发部: Mock.Random.float(50000, 250000, 0, 0),
          营销部: Mock.Random.float(50000, 250000, 0, 0),
        })
      );
    }
    return {
      code: 200,
      data: {
        // 公司收入数据
        incomeData: [
          {
            index: "1",
            time: "上周",
            money: "60000",
            color: "#409EFF",
          },
          {
            index: "2",
            time: "本月",
            money: "140000",
            color: "#67C23A",
          },
          {
            index: "3",
            time: "今年",
            money: "1200000",
            color: "#F56C6C",
          },
          {
            index: "4",
            time: "去年",
            money: "2000000",
            color: "#E6A23C",
          },
        ],
        // 部门数据
        departmentData: [
          {
            department: "行政部",
            manager: "吴熙捷",
            number_people: "10",
            office_cost: "36000",
            traffic_cost: "2000",
            overtime_cost: "4000",
            salary_cost: "80000",
            other_cost: "3000",
            all_costs: "125000",
          },
          {
            department: "财务部",
            manager: "陈晓丽",
            number_people: "8",
            office_cost: "30000",
            traffic_cost: "2000",
            overtime_cost: "3200",
            salary_cost: "72000",
            other_cost: "2800",
            all_costs: "110000",
          },
          {
            department: "人事部",
            manager: "赵颖",
            number_people: "6",
            office_cost: "20000",
            traffic_cost: "1600",
            overtime_cost: "2400",
            salary_cost: "48000",
            other_cost: "2000",
            all_costs: "74000",
          },
          {
            department: "研发部",
            manager: "胡捷豪",
            number_people: "13",
            office_cost: "50000",
            traffic_cost: "3800",
            overtime_cost: "5200",
            salary_cost: "130000",
            other_cost: "4000",
            all_costs: "193000",
          },
          {
            department: "营销部",
            manager: "林莉",
            number_people: "8",
            office_cost: "15000",
            traffic_cost: "1000",
            overtime_cost: "3200",
            salary_cost: "64000",
            other_cost: "1800",
            all_costs: "85000",
          },
        ],
        // 折线图
        // 2021年各部门每月消费趋势数据
        costData: {
          date: [
            "202101",
            "202102",
            "202103",
            "202104",
            "202105",
            "202106",
            "202107",
            "202108",
            "202109",
            "202110",
            "202111",
            "202112",
          ],
          data: List,
        },
        // 柱状图
        // 上周公司收入详情
        weekData: [
          {
            date: "周一",
            value: 8000,
          },
          {
            date: "周二",
            value: 6000,
          },
          {
            date: "周三",
            value: 6000,
          },
          {
            date: "周四",
            value: 5000,
          },
          {
            date: "周五",
            value: 5000,
          },
          {
            date: "周六",
            value: 12000,
          },
          {
            date: "周日",
            value: 18000,
          },
        ],
        // 饼图
        // 公司各部门人数占比
        peopleData: [
          {
            name: "行政部",
            value: "10",
          },
          {
            name: "财务部",
            value: "8",
          },
          {
            name: "人事部",
            value: "6",
          },
          {
            name: "研发部",
            value: "13",
          },
          {
            name: "营销部",
            value: "8",
          },
        ],
      },
    };
  },
};
