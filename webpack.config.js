const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    modules: [__dirname, 'src', 'node_modules'],
    extensions: ["*", ".js", ".jsx"],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: './bundle.js',
    publicPath: '/public/',
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'DEV_URL': 'http://localhost:3000',
        'REACT_APP_BASE_URL': JSON.stringify(process.env.REACT_APP_BASE_URL)
      }
    }),

  ]
}
