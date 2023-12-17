import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000,
});

// 请求拦截
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/*
 *封装get方法
 *@param{String} url [请求地址]
 *@param{Object} params 请求参数
 */
export function Get(url, params) {
  return new Promise((resolve, reject) => {
    instance
      .get(url, {
        params: params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error.data);
      });
  });
}

/**
 *封装post方法
 *@param{String} url 请求地址
 *@param{Object} params 请求参数
 */
export function Post(url, params) {
  return new Promise((resolve, reject) => {
    instance
      .post(url, params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error.data);
      });
  });
}

/**
 *封装put方法
 *@param{String} url 请求地址
 *@param{Object} params 请求参数
 */
export function Put(url, params) {
  return new Promise((resolve, reject) => {
    instance
      .put(url, params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error.data);
      });
  });
}

/**
 *封装patch方法
 *@param{String} url 请求地址
 *@param{Object} params 请求参数
 */
export function Patch(url, params) {
  return new Promise((resolve, reject) => {
    instance
      .put(url, params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error.data);
      });
  });
}

/**
 *封装delete方法
 *@param{String} url [请求地址]
 *@param{Object} params [请求参数]
 */
export function Delete(url, params) {
  return new Promise((resolve, reject) => {
    instance
      .delete(url, {
        params: params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error.data);
      });
  });
}
