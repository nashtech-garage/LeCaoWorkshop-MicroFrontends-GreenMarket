export default {
    getBlogs: async function(axios) {
        let url = process.env.VUE_APP_COMMON_URL + '/data/data.json';
        console.log(url);
        let result = await axios.get(url);
        return result.data.data.blog;
    }
}