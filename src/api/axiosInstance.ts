import axios from 'axios';

const baseURL = 'http://localhost:3500';

const axiosInstance =  axios.create({
  baseURL,
  withCredentials: true,
  timeout: 60000,
  headers:{
    'Content-Type' : 'application/json'
  }
});

export const axiosPrivate = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 60000,
  headers:{
    'Content-Type' : 'application/json',
    'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
  }
});

export default axiosInstance