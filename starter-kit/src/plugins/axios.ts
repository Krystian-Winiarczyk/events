import axios from 'axios'
import { useAuthStore } from "@/store/auth";

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: 'http://localhost:3001/api/',

  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

axiosIns.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token && config.url !== "/auth/refresh" && config.url !== "/auth/login") {
      config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosIns.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    console.log(originalConfig)

    if ((originalConfig.url !== "/auth/login" && originalConfig.url !== "/auth/refresh") && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          await useAuthStore().reloadRefreshToken()

          return axiosIns(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default axiosIns
