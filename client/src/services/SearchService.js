import axios from 'axios';

export default {
  search: async (user, query) => {
    let res = await axios.get(`/api/search?user=${user}&name=${query}`);
    return res.data || [];
  }
}