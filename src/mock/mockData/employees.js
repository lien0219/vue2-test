// mock数据模拟
import Mock, { Random } from "mockjs";

// 模拟员工数据
let List = [];
for (let i = 0; i < 45; i++) {
  List.push(
    Mock.mock({
      id: i + 2001,
      name: Random.cname(),
      "sex|1": ["男", "女"],
      age: Random.natural(18, 60),
      "department|1": ["行政部", "财务部", "人事部", "研发部", "营销部"],
      date: Random.date("yyyy-MM-dd"),
      address: `${Random.province()}-${Random.city()}-${Random.county()}`,
    })
  );
}

export default {
  //获取员工列表
  getEmployeesList: () => {
    return {
      code: 200,
      data: {
        total: List.length,
        employeesList: List,
      },
    };
  },
  //新增员工
  addEmployees: (options) => {
    let employeesData = JSON.parse(options.body).params.employeesData;
    let id = List.length + 2001;
    employeesData.id = id;
    List = List.concat(employeesData);
    return {
      code: 200,
      message: "添加操作成功",
    };
  },
  //删除员工
  deleteEmployees: (options) => {
    let id = parseInt(JSON.parse(options.body).params.id);
    if (!id) {
      return {
        code: -200,
        message: "参数不正确",
      };
    } else {
      List = List.filter((e) => e.id !== id);
      return {
        code: 200,
        message: "员工" + id + "删除成功",
      };
    }
  },
  //查询员工
  searchEmployees: (options) => {
    let keywords = JSON.parse(options.body).params.keywords;
    let searchList = [];
    searchList = List.filter((e) => {
      return e.name.indexOf(keywords) !== -1;
    });
    let len = searchList.length;
    if (len > 0) {
      return {
        code: 200,
        message: "查询成功",
        data: {
          total: len,
          searchList,
        },
      };
    } else {
      return {
        code: -200,
        message: "无相关员工,查询失败",
      };
    }
  },
  //更新员工
  editEmployees: (options) => {
    let employeesData = JSON.parse(options.body).params.employeesData;
    console.log(employeesData);
    List = List.map((val) => {
      return val.id === employeesData.id ? employeesData : val;
    });
    return {
      code: 200,
      message: "编辑操作成功",
    };
  },
};
