const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader'}, { loader: 'css-loader'}],
},
{
  test: /\.(png|jpe?g|gif)$/i,
  use: [
    {
      loader: "file-loader",
    },
  ],
  type: 'javascript/auto'
},
{
  test: /\.(mp3|wav)$/i,
  use: [
    {
      loader: "file-loader",
    },
  ],
  type: 'javascript/auto'
}
);

module.exports = {
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css']
  },
};
