const path = require('path');

module.exports = {
  public: path.resolve(__dirname, '../public'),
  src: path.resolve(__dirname, '../src'),
  dist: path.resolve(__dirname, '../dist'),
  assets: path.resolve(__dirname, '../src/assets'),
  images: path.resolve(__dirname, '../src/assets/images'),
  fonts: path.resolve(__dirname, '../src/assets/fonts'),
  scss: path.resolve(__dirname, '../src/assets/styles'),
  components: path.resolve(__dirname, '../src/components/'),
  pages: path.resolve(__dirname, '../src/pages'),
}