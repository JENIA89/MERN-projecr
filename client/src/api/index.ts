import axios from "axios";

export const baseURL = process.env.REACT_APP_BASE_API;

export const api = axios.create({baseURL});

api.interceptors.request.use(req => {
  if(localStorage.getItem('profile')) {
    // @ts-ignore
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
})