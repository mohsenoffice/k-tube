import axios from 'axios';

export default {
  search: async (mail, password, isAdmin) => {
    let res = await axios.get(`/api/login`,{
      mail,
      password,
      isAdmin
    });
   
    return res.data || "BAD";
  }
}