module.exports = {
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: false,
        secure: false,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}