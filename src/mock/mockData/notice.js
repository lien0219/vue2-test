// 通知数据
let List1 = [
  {
    index: 1,
    title: "关于开展核实部门虚假消费报销工作",
    paragraph:
      "测试测试测试测试测试测试关于开展核实部门虚假消费报销工作测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试关于开展核实部门虚假消费报销工作测试测试测试测试测试测试测试测",
    date: "2022-6-17",
  },
  {
    index: 2,
    title: "公司全体人员假期防疫工作",
    paragraph:
      "测试测试测试测试测试测试公司全体人员假期防疫工作测试测试测试测试测试测试测试测试测试测试测试",
    date: "2022-6-13",
  },
];
let List2 = [
  {
    index: 3,
    title: "2022年公司新招各部门实习生共20名",
    paragraph:
      "测试测试测试测试测试测试2022年公司新招各部门实习生共20名测试测试测试测试测试测试测试测试测试测试测试",
    date: "2022-6-10",
  },
  {
    index: 4,
    title: "恭喜财务部陈晓丽获得本季度最佳员工领导奖",
    paragraph:
      "测试测试测试测试测试测试恭喜财务部陈晓丽获得本季度最佳员工领导奖测试测试测试测试测试测试测试",
    date: "2022-6-01",
  },
];
let List = List1.concat(List2);

export default {
  getNoticeData: () => {
    return {
      code: 200,
      data: {
        noticeList: List,
      },
    };
  },
  getUnReadData: () => {
    return {
      code: 200,
      data: {
        unReadList: List1,
      },
    };
  },
  getReadData: () => {
    return {
      code: 200,
      data: {
        readList: List2,
      },
    };
  },
  removeNotice: (options) => {
    let noticeData = JSON.parse(options.body).params.noticeData;
    let index = parseInt(JSON.parse(options.body).params.noticeData.index);
    if (!index) {
      return {
        code: -200,
        message: "参数不正确,标记失败",
      };
    } else {
      // 未读列表移除通知
      List1 = List1.filter((e) => e.index !== index);
      // 已读列表添加通知
      List2 = List2.concat(noticeData);
      return {
        code: 200,
        message: "成功标记已读信息",
      };
    }
  },
  delNotice: (options) => {
    let index = parseInt(JSON.parse(options.body).params.index);
    if (!index) {
      return {
        code: -200,
        message: "参数不正确,删除失败",
      };
    } else {
      List2 = List2.filter((e) => e.index !== index);
      return {
        code: 200,
        message: "删除成功",
      };
    }
  },
};
