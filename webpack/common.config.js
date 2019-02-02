const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const root = path.resolve(__dirname, '..')

module.exports = {
  entry: path.resolve(root, 'src', 'index.js'),
  output: {
    path: path.resolve(root, 'dist'),
    filename: 'webpack.bundle.js',
  },
  resolve: {
    extensions: ['.js'],
    modules: [
      path.resolve(root, 'src'),
      path.resolve(root, 'node_modules')
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
}
