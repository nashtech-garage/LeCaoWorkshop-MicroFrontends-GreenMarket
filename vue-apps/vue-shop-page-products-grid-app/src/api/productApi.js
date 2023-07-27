export default {
    getProducts: async function(axios) {
        let url = process.env.VUE_APP_COMMON_API_URL + '/api/Product/all';
        let result = await axios.get(url);
        return result.data;
    },
    getSaleOffProducts: async function(axios) {
        let url = process.env.VUE_APP_COMMON_API_URL + '/api/Product/all';
        let result = await axios.get(url);
        return result.data.filter(x => x.discount > 0);
    },
    getProductCategories: async function(axios) {
        let url = process.env.VUE_APP_COMMON_API_URL + '/api/Category/all';
        let result = await axios.get(url);
        return result.data;
    }
}