import axios from 'axios';

export default {
  search: async (mail, password, isAdmin) => {
    let res = await axios.post(`/api/register`,{
      mail,
      password,
      isAdmin
    });
   
    return res.data || "BAD";
  }
}