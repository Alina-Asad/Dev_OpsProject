const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // ✅ Entry point
  output: {
    path: path.resolve(__dirname, 'dist'), // ✅ Output dir
    filename: 'bundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // ✅ JS + JSX
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/, // ✅ CSS
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // ✅ Use public/index.html as template
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'dist'), // ✅ Serve built files
    port: 3000,
    open: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  mode: 'development',
};
