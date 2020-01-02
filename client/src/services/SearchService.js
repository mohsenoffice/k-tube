import axios from 'axios';

export default {
  search: async (query) => {
    let res = await axios.get(`/api/search?name=${query}`);
    return res.data || [];
  }
}