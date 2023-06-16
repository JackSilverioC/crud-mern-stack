import axios from "axios";

const instance = axios.create({
  baseURL: "https://crud-mern-stack-backend-production.up.railway.app/api",
  withCredentials: true
});

export default instance;
