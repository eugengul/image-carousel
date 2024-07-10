const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    // What for changes of a template file with html-webpack-plugin
    watchFiles: ["src/**/*.html"],
  },
  // If you have several entrypoints
  // optimization: {
  //   runtimeChunk: 'single',
  // },
});