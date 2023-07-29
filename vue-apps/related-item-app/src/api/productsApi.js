export default {
    getProducts: function(axios) {
      let url = "api/Product/all";
      return axios.get(url);
    },
}