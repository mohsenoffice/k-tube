import axios from 'axios';

export default {
  login: async (mail, password, isAdmin) => {
    let res = await axios.post(`/api/login`,{
      mail,
      password,
      isAdmin
    });
   
    return res.data || "BAD";
  }
}