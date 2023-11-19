import axios from "axios";

const { DEV } = import.meta.env;

const instance = axios.create({
  baseURL: DEV
    ? "http://localhost:3009"
    : "https://github-resume.api.consistent.kr/",
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
