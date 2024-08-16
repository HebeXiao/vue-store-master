/*
 * configuration file
 */
module.exports = {
  publicPath: './',
  devServer: {
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000/', // local backend address
        changeOrigin: true, // Allow cross-domain
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}