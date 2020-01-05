import axios from 'axios';

export default {
  watched: async (user, videoId, videoTitle) => {
    let res = await axios.get(`/api/watched?user=${user}&videoId=${videoId}&videoTitle=${videoTitle}`);
    return res.data || [];
  }
}