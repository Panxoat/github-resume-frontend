import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  // baseURL: "http://192.168.1.4:3000",
});

axios.interceptors.request.use(
  (request) => {
    console.log("#request", request);
    return request;
  },
  (error) => {
    console.log("#request error", error);
    return error;
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log("#response", response);
    return response;
  },
  (error) => {
    console.log("#response error", error);
    return error;
  }
);

export default instance;
