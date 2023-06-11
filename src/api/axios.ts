import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.DEV
    ? "localhost:3000"
    : import.meta.env.PROD_BASE_URL,
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
