import axios from "axios";
import { ACCESS_KEY } from "../utils/constants";

const axiosClient = axios.create({
  baseURL: 'https://api.unsplash.com/',
  headers: {
    Authorization: 'Client-ID ' + ACCESS_KEY,
  }
});

axiosClient.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  return Promise.reject(error);
});

export default axiosClient