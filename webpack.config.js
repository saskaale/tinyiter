const path = require('path');

module.exports = {
    entry: {
        app: './src/index.js'
    },
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ]
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'lib'),
        library: 'library',
        libraryTarget: 'umd'
    }
  };