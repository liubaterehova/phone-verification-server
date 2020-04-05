const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const CURRENT_DIRECTORY = path.resolve();

module.exports = {
  target: 'node',
  mode: 'development',
  entry: path.join(CURRENT_DIRECTORY, './src/index.js'),
  output: {
    path: path.resolve('dist'),
    filename: 'server.js',
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [nodeExternals()],
  resolve: {
    modules: [path.resolve('src'), 'node_modules'],
    extensions: ['.js'],
    symlinks: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: [path.resolve('src')],
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'eslint-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
};
