const path = require('path');

module.exports = {
  public: path.resolve(__dirname, '../public'),
  src: path.resolve(__dirname, '../src'),
  dist: path.resolve(__dirname, '../dist'),
  assets: path.resolve(__dirname, '../src/assets'),
  images: path.resolve(__dirname, '../src/assets/images'),
  scss: path.resolve(__dirname, '../src/assets/scss'),
  components: path.resolve(__dirname, '../src/components/'),
  pages: path.resolve(__dirname, '../src/pages'),
}