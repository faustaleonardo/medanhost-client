import axios from 'axios';

const baseUrlDev = 'http://localhost:5000';
const baseUrlProd = 'https://ce16ca29.ngrok.io';

const jwt = localStorage.getItem('jwt');
export default axios.create({
  baseURL: baseUrlProd,
  headers: {
    common: {
      Authorization: `Bearer ${jwt}`,
    },
    post: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  },
});
