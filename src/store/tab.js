export default {
  state: {
    isCollapse: true,
    tabList: [
      {
        path: "/home",
        name: "Home",
        label: "首页",
        icon: "home",
      },
    ],
    currentMenu: null,
  },
  mutations: {
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse;
    },
    selectMenu(state, val) {
      if (val.name !== "Home") {
        state.currentMenu = val;
        const result = state.tabList.findIndex(
          (item) => item.name === val.name
        );
        if (result === -1) {
          state.tabList.push(val);
        } else {
          state.collapseMenu = null;
        }
      }
    },
    closeTag(state, val) {
      const result = state.tabList.findIndex((item) => item.name === val.name);
      state.tabList.splice(result, 1);
    },
  },
};
