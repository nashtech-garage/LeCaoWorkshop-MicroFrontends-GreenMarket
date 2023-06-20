export default {
    getProducts: function(axios) {
      let url = "/data/data.json";
      return axios.$get(url);
    },
}