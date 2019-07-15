var path = require('path');

module.exports = {
  mode: 'development',
  entry: {
      aurora: './public/js/aurora.js'
  },
  output: {
    filename: '[name].dist.js',
    path: path.resolve(__dirname, 'public/js')
  }
};