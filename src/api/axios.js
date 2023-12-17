import { Get, Post, Put, Patch, Delete } from "./request.js";

export default {
  getListData: (params) => {
    return Get("../../static/data.json", params);
  },
  postListData: (params) => {
    return Post("../../static/data.json", params);
  },
  putListData: (params) => {
    return Put("../../static/data.json", params);
  },
  patchListData: (params) => {
    return Patch("../../static/data.json", params);
  },
  deleteListData: (params) => {
    return Delete("../../static/data.json", params);
  },
};
