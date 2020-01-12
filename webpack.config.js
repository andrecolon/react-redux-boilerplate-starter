const path = require('path'); // to get the current path
const webpack = require('webpack');
const dotenv = require('dotenv');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const fs = require('fs');

// what environment are we in?
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'test') {
  // set up test environment variables
  require('dotenv').config({ path: '.env.test' });
} else if (process.env.NODE_ENV === 'development') {
  // set up development environment variables
  require('dotenv').config({ path: '.env.development' });
}

// to check if the file exists
const devMode = process.env.NODE_ENV !== 'production';
// console.log(devMode);
module.exports = env => {
  // Get the root path (assuming your webpack config is in the root of your project)
  // const currentPath = path.join(__dirname);

  // Create the fallback path (the production .env)
  // const basePath = `${currentPath}/.env`;

  // We're concatenating the environment name to our filename to specify the correct .env file
  // const envPath = `${basePath}.${env.ENVIRONMENT}`;

  // Check if the file exists, otherwise fall back to the production .env
  // const finalPath = fs.existsSync(envPath) ? envPath : basePath;

  // Set the path parameter in the dotenv config
  // const fileEnv = dotenv.config({ path: finalPath }).parsed;

  // call dotenv and it will return an Object with a parsed key
  // const env = dotenv.config().parsed;

  // reduce it to a nice object with the variables from the file
  // const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
  //   prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
  //   return prev;
  // }, {});

  // console.log('env', env);
  // const isProduction = env === 'production';
  console.log(process.env.ENVIRONMENT);
  const isProduction = process.env.ENVIRONMENT === 'Production';
  // const CSSExtract = new MiniCssExtractPlugin({
  //   filename: devMode ? '[name].css' : '[name].[hash].css',
  //   chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
  // });
  const CSSExtract = new MiniCssExtractPlugin({
    filename: 'main.css',
  });

  return {
    entry: ['@babel/polyfill', './src/app.js'],
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: 'bundle.js',
    },
    optimization: {
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    module: {
      rules: [
        {
          loader: 'babel-loader',
          test: /\.js$/,
          exclude: /node_modules/,
        },
        {
          test: /\.(scss|css)$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: process.env.NODE_ENV === 'development',
              },
            },
            { loader: 'css-loader', options: { sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } },
          ],
        },
      ],
    },
    plugins: [
      CSSExtract,
      // new webpack.DefinePlugin(envKeys),
      new webpack.DefinePlugin({
        'process.env.FIREBASE_API_KEY': JSON.stringify(
          process.env.FIREBASE_API_KEY
        ),
        'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(
          process.env.FIREBASE_AUTH_DOMAIN
        ),
        'process.env.FIREBASE_DATABASE_URL': JSON.stringify(
          process.env.FIREBASE_DATABASE_URL
        ),
        'process.env.FIREBASE_PROJECT_ID': JSON.stringify(
          process.env.FIREBASE_PROJECT_ID
        ),
      }),
    ],
    devtool: !devMode ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      publicPath: '/dist/',
    },
  };
};
