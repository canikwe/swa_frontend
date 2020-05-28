const path = require('path')
const Dotenv = require('dotenv-webpack')

module.exports = {
  entry: {
    main: path.join(__dirname, 'src', 'index.js'),
    vendor: path.join(__dirname, 'src', 'vendor.js'),
  },
  // plugins: [new Dotenv()],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
    ]
  }
}