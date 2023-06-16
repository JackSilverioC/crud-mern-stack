import axios from "axios";

const instance = axios.create({
  baseURL: "https://crud-mern-stack-backend-production.up.railway.app/api",
  withCredentials: true
});

// instance.interceptors.request.use((config) => {
//   config.headers.Cookie = `${config.headers.Cookie}; SameSite=None`;
//   return config;
// });

export default instance;
