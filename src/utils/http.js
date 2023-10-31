import axios from "axios";


const token = localStorage.getItem('token')
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: { 'token': `Bearer ${token}` }
  },
});
const loginAxiosInstance = axios.create(
  {
    baseURL: process.env.REACT_APP_API_URL + "/auth",
  });

axiosInstance.interceptors.request.use((req) => {
  const token = localStorage.getItem('token')
  if (token) {
       req.headers.Authorization = `Bearer ${token}`
  }
  return req
})

export default { axiosInstance, loginAxiosInstance };      