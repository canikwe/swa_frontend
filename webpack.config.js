const path = require('path')
const webpack = require('webpack')


// module.exports = {
//   entry: path.join(__dirname, "src", "index.js"),
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /node_modules/,
//         use: {
//           loader: "babel-loader"
//         }
//       },
//             {
//         test: /\.css$/,
//         use: ["style-loader", "css-loader"]
//       }
//     ]
//   },
//   resolve: {
//     extensions: ['*', '.js', '.jsx']
//   },
//   output: {
//     path: path.join(__dirname, "public"),
//     filename: "bundle.js",
//     publicPath: "/"
//   },

//   devServer: {
//     hot: true,
//     historyApiFallback: true
//   }
// };

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  // mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
        // loader: "babel-loader",
        // options: { presets: ["@babel/env"] }
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
  // output: {
  //   path: path.resolve(__dirname, "dist/"),
  //   publicPath: "/dist/",
  //   filename: "bundle.js"
  // },
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/public/',
    filename: './bundle.js'
  },
  devServer: {
    // contentBase: './dist',
    historyApiFallback: true
  },
  
  // devServer: {
  //   contentBase: './src',
  //   port: 3001,
  //   publicPath: "http://localhost:3000/dist/",
  // },
  // plugins: [
  //   new webpack.DefinePlugin({
  //     'process.env': {
  //       'NODE_ENV': JSON.stringify('development'),
  //       'API_HOST': 'http://localhost:3000'
  //     }
  //   })
  // ]
}

// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const path = require('path');

// module.exports = {
//   entry: './index.js',
//   output: {
//     filename: 'bundle.[hash].js',
//     path: path.resolve(__dirname, 'dist')
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: './public/index.html'
//     })
//   ],
//   resolve: {
//     modules: [__dirname, 'src', 'node_modules'],
//     extensions: ['*', '.js', '.jsx'],
//   },
//   module: {
//     rules: [
//       {
//         test: /\.jsx?$/,
//         exclude: /node_modules/,
//         loader: require.resolve('babel-loader')
//       },
//       {
//         test: /\.css$/,
//         use: ['style-loader', 'css-loader']
//       }
//     ]
//   }
// }