module.exports = {
  transpileDependencies: [],
  configureWebpack: {
    output: {
      libraryTarget: "system",
      filename: "js/app.js",
    },
  },
};