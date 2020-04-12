import axios from 'axios';

const jwt = localStorage.getItem('jwt');
export default axios.create({
  baseURL: 'http://localhost:5000/',
  headers: {
    common: {
      Authorization: `Bearer ${jwt}`,
    },
    post: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  },
});
