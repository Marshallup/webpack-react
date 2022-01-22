const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');
const paths = require('./config/paths');

const config = {
  mode: "development",
  entry: {
    app: [
      './src/main.js',
    ]
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: paths.dist, // base path where to send compiled assets
    publicPath: '/', // base path where referenced files will be look for
    asyncChunks: true,
  },
  devtool: 'inline-source-map',
  optimization: {
    splitChunks: {
      // include all types of chunks
      chunks: 'all',
      cacheGroups: {
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: "react"
        },
      },
    },
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              "imagemin-gifsicle",
              "imagemin-mozjpeg",
              "imagemin-pngquant",
              "imagemin-svgo",
            ],
          },
        },
      }),
    ]
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    client: {
      overlay: true,
      logging: 'error',
    },
    static: './public', //relative path to output path where  devserver will look for compiled files
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      '@': paths.src,
      'images': paths.images,
    }
  },
  module: {
    rules: [
      { // config for es6 jsx
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.module\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          {
            loader: "sass-loader",
            options: {
							//importLoaders: 2,
							modules: {
								localIdentName: '[local]__[sha1:hash:hex:7]'
							}
						}
          }
        ]
      },
      {
				test: /^((?!\.module).)*css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader']
			},
      { // config for images
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name]-[hash][ext]',
        }
        // use: [
        //   {
        //     // loader: 'file-loader',
        //     options: {
        //       outputPath: 'images',
        //       name: '[name]-[sha1:hash:hex:7].[ext]'
        //     }
        //   }
        // ],
      },
      { // config for fonts
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'fonts',
            }
          }
        ],
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.posix.join(
            path.resolve(paths.public).replace(/\\/g, "/"),
            '**'
          ),
          filter: async(resourcePath) => {
            if (/\.html$/.test(resourcePath)) {
              return false;
            }
            return true;
          },
          to() {
            return '[name][ext]';
          },
        }
      ]
    }),
    new HtmlWebpackPlugin({
        template: path.resolve(paths.public, 'index.html'),
        hash: true,
        inject: 'body',
        filename: 'index.html',
    }),
    new MiniCssExtractPlugin({ // plugin for controlling how compiled css will be outputted and named
      filename: "css/[name].css",
      chunkFilename: "css/[id].css"
    })
  ]
};

module.exports = (env, options) => {
	const isProd = options.mode === 'production';
  if (isProd) {
    config.devtool = false;
  }
	return config;
}