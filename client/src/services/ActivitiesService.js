import axios from 'axios';

export default {
  search: async (user) => {
    let res = await axios.get(`/api/activities?user=${user}`);
    return res.data || [];
  },
  getAll: async () => {
    let res = await axios.get(`/api/activities`);
    return res.data || [];
  }
}