import axios from 'axios';

const baseURL = 'https://medanhost.xyz';

const jwt = localStorage.getItem('jwt');
export default axios.create({
  baseURL,
  headers: {
    common: {
      Authorization: `Bearer ${jwt}`,
    },
    post: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  },
});
