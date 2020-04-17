import axios from 'axios';

const baseUrlDev = 'http://localhost:5000';
const baseUrlProd = 'https://1d49b3ac.ngrok.io';

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
