const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');
const paths = require('./config/paths');
const { WEBPACK_ANALYZE } = process.env;

const postcssRule = {
	loader: 'postcss-loader',
	options: {
		postcssOptions: {
			plugins: [
				'postcss-preset-env',
				'autoprefixer',
				'postcss-csso',
				'postcss-normalize',
				'postcss-flexbugs-fixes'
			]
		}
	}
};

const config = {
	mode: 'development',
	entry: {
		app: [
			'./src/main.js',
		]
	},
	output: {
		filename: 'assets/js/[name].bundle.js',
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
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					name: 'chunk-vendors',
					priority: -10,
					chunks: 'initial',
				},
				common: {
					name: 'chunk-common',
					minChunks: 2,
					priority: -20,
					chunks: 'initial',
					reuseExistingChunk: true,
				}
			},
		},
		minimizer: [
			new ImageMinimizerPlugin({
				minimizer: {
					implementation: ImageMinimizerPlugin.imageminMinify,
					options: {
						plugins: [
							'imagemin-gifsicle',
							'imagemin-mozjpeg',
							'imagemin-pngquant',
							'imagemin-svgo',
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
		extensions: [ '*', '.js', '.jsx' ],
		alias: {
			'@': paths.src,
			'pages': paths.pages,
			'components': paths.components,
			'images': paths.images,
			'fonts': paths.fonts,
			'assets': paths.assets,
			'scss': paths.scss,
		}
	},
	module: {
		rules: [
			{ // config for es6 jsx
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.s[ac]ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					postcssRule,
					'sass-loader',
				]
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					postcssRule,
				],
			},
			{ // config for images
				test: /\.(png|svg|jpg|jpeg|gif|webp)$/,
				type: 'asset/resource',
				generator: {
					filename: 'assets/images/[name]-[hash][ext]',
				}
			},
			{ // config for fonts
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				type: 'asset/resource',
				generator: {
					filename: 'assets/fonts/[base]',
				},
			}
		]
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{
					from: path.posix.join(
						path.resolve(paths.public).replace(/\\/g, '/'),
						'**'
					),
					filter: async (resourcePath) => {
						return !/\.html$/.test(resourcePath);
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
		new MiniCssExtractPlugin({
			filename: 'assets/css/[name].css',
			chunkFilename: 'assets/css/[id].css'
		}),
    new BundleAnalyzerPlugin({
      analyzerMode: WEBPACK_ANALYZE ? 'server' : 'disabled',
    }),
    new CleanWebpackPlugin(),
	]
};

module.exports = (env, options) => {
	const isProd = options.mode === 'production';
	if (isProd) {
		config.devtool = false;
	}
	return config;
}