// mock数据模拟
import Mock, { Random } from "mockjs";

// 管理员数据
let List = [];
for (let i = 0; i < 5; i++) {
  List.push(
    Mock.mock({
      id: i + 1001,
      image: Random.image("100x100", "#894FC4", "#FFF", "png", "@id"),
      name: "admin",
      password: "admin" + (i + 1001),
    })
  );
}

export default {
  //获取管理员列表
  getAdminList: () => {
    return {
      code: 200,
      data: {
        total: List.length,
        adminList: List,
      },
    };
  },
  //登录
  login(options) {
    let loginData = JSON.parse(options.body).params.loginData;
    //检验账号是否存在
    let val = List.find(
      (e) => e.name === loginData.name && e.password === loginData.password
    );
    if (!val) {
      return {
        code: -200,
        message: "账号或密码错误,登录失败",
        token: "",
      };
    } else {
      let loginAdmin = [];
      loginAdmin = List.filter((a) => {
        return a.name.indexOf(loginData.name) !== -1;
      });
      return {
        code: 200,
        message: "登录成功",
        token: loginAdmin,
      };
    }
  },
  //新增管理员
  addAdmin: (options) => {
    let adminData = JSON.parse(options.body).params.adminData;
    let id = List.length + 1001;
    adminData.id = id;
    //检验账号是否存在
    let val = List.find((a) => a.name === adminData.name);
    if (val) {
      return {
        code: -200,
        message: "添加操作失败,账号已存在",
      };
    } else {
      List = List.concat(adminData);
      return {
        code: 200,
        message: "添加操作成功",
      };
    }
  },
  //删除管理员
  deleteAdmin: (options) => {
    let id = parseInt(JSON.parse(options.body).params.id);
    if (!id) {
      return {
        code: -200,
        message: "参数不正确",
      };
    } else {
      List = List.filter((a) => a.id !== id);
      return {
        code: 200,
        message: "管理员" + id + "删除成功",
      };
    }
  },
  //查询管理员
  searchAdmin: (options) => {
    let keywords = JSON.parse(options.body).params.keywords;
    let searchList = [];
    searchList = List.filter((a) => {
      return a.name.indexOf(keywords) !== -1;
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
        message: "无相关管理员,查询失败",
      };
    }
  },
  //更新管理员
  editAdmin: (options) => {
    let adminData = JSON.parse(options.body).params.adminData;
    console.log(adminData);
    List = List.map((val) => {
      return val.id === adminData.id ? adminData : val;
    });
    return {
      code: 200,
      message: "编辑操作成功",
    };
  },
};
