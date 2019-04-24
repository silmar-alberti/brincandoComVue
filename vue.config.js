const path = require('path');

module.exports = {
  "configureWebpack": {
    "resolve": {
      "alias": {
        "pica": "pica/dist/pica.js",
        '@': path.resolve(__dirname, './'),
        '@components': path.resolve(__dirname, './', 'src', 'components'),
        '@services': path.resolve(__dirname, './', 'src', 'services'),
        '@store': path.resolve(__dirname, './', 'src', 'store')
      }
    }
  }
}