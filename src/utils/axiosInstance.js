import axios from 'axios';

const jwtToken = localStorage.getItem('jwt_token');
export default axios.create({
  baseURL: 'http://localhost:5000/',
  headers: {
    common: {
      Authorization: `Bearer ${jwtToken}`,
    },
    post: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  },
});
