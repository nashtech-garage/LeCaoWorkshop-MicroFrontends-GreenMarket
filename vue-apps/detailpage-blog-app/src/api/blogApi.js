export default {
  getBlogs: async function (axios) {
    let url = process.env.VUE_APP_COMMON_API_URL + "/api/Blog/all";
    let result = await axios.get(url);
    return result.data;
  },
};
