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
        globalObject: 'typeof self !== \'undefined\' ? self : this',  //HACK FOR THE https://github.com/webpack/webpack/issues/6784
        library: 'library',
        libraryTarget: 'umd'
    }
  };