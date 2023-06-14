import axios from "axios";

const instance = axios.create({
  baseURL: "https://crud-mern-stack-production-846f.up.railway.app//api",
  withCredentials: true
});

export default instance;
