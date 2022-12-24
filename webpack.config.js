const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'src'),
    filename: 'bundle.js'
  },
  module: {
    rules:[
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use :{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env','@babel/preset-react']
          }
        }
        },
      {
      test: /\.s[ac]ss$/i,
      exclude: /node_modules/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]}
    ]
  }
}