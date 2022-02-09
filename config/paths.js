const path = require('path');

function getSrcPath(pathName) {
  return path.resolve(__dirname, `../src/${pathName}/`);
}

module.exports = {
  public: path.resolve(__dirname, '../public'),
  src: path.resolve(__dirname, '../src'),
  dist: path.resolve(__dirname, '../dist'),
  assets: getSrcPath('assets'),
  images: getSrcPath('assets/images'),
  fonts: getSrcPath('assets/fonts'),
  scss: getSrcPath('assets/styles'),
  components: getSrcPath('components'),
  pages: getSrcPath('pages'),
  reducers: getSrcPath('redux/reducers'),
  sagas: getSrcPath('redux/sagas'),
  utils: getSrcPath('utils'),
}