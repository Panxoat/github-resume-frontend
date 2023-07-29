import axios from "axios";

const { DEV, VITE_PROD_BASE_URL } = import.meta.env;

const instance = axios.create({
  baseURL: DEV ? "http://localhost:3000" : VITE_PROD_BASE_URL,
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
