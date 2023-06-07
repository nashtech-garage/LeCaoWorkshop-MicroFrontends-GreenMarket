export default {
    getProducts: async function(axios) {
        let url = process.env.VUE_APP_COMMON_URL + '/data/data.json';
        let result = await axios.get(url);
        return result.data.data.products;
    },
    getSaleOffProducts: async function(axios) {
        let url = process.env.VUE_APP_COMMON_URL + '/data/data.json';
        let result = await axios.get(url);
        return result.data.data.products.filter(x => x.discount > 0);
    },
    getProductCategories: async function(axios) {
        let url = process.env.VUE_APP_COMMON_URL + '/data/data.json';
        let result = await axios.get(url);
        return result.data.data.categories;
    }
}