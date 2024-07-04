import axios from 'axios';

const api = axios.create({
  baseURL: 'https://veiopads.netlify.app/api/luis-santos',
});

export default api;