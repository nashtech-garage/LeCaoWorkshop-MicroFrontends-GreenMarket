export default {
    getProducts: async function(axios) {
        let url = process.env.VUE_APP_COMMON_URL + '/data/data.json';
        let result = await axios.get(url);
        return result.data.data.products;
    },
    getProductCategories: async function(axios) {
        let url = process.env.VUE_APP_COMMON_URL + '/data/data.json';
        let result = await axios.get(url);
        return result.data.data.categories;
    }
}