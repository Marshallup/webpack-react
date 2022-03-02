const path = require('path');
// import Compiler
const { Compilation, sources } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { WEBPACK_ANALYZE } = process.env;
const paths = require('./config/paths');

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
            ],
        },
    },
};
const PLUGIN_NAME = 'testPlugin';
class TestPlugin {
    apply(compiler) {
        const logger = compiler.getInfrastructureLogger(PLUGIN_NAME);
        logger.log('log from compiler');

        compiler.hooks.done.tap(PLUGIN_NAME, (stats) => {
            console.log('done!')
        });
        compiler.hooks.watchRun.tap(PLUGIN_NAME, (compiler) => {
            console.log('run watcher...')
        })
        compiler.hooks.watchClose.tap(PLUGIN_NAME, () => {
            // console.log(compiler, 'compiler')
            console.log('stop watch')
        })
    }
}

const config = {
    mode: 'development',
    entry: {
        app: [
            'babel-polyfill',
            './src/index.tsx',
        ]
    },
    stats: 'errors-only',
    output: {
        filename: 'assets/js/[name].bundle.js',
        path: paths.dist, // base path where to send compiled assets
        publicPath: '/', // base path where referenced files will be look for
        asyncChunks: true,
    },
    devtool: 'inline-source-map',
    optimization: {
        splitChunks: {
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
                },
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
            logging: 'log',
        },
        onListening: function (devServer) {
            // console.clear();
            console.log('devServer')
        },
        // setupMiddlewares: (middlewares, devServer) => {
        //     return middlewares;
        // },
        static: './public',
    },
    infrastructureLogging: {
        // colors: false,
        console: {
            info: (info) => {}
        }
    },
    resolve: {
        extensions: [ '*', '.js', '.jsx', '.ts', '.tsx' ],
        alias: {
            'src': paths.src,
            'pages': paths.pages,
            'components': paths.components,
            'utils': paths.utils,
            'reducers': paths.reducers,
            'sagas': paths.sagas,
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
                },
            },
            { // config for es6 jsx
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'ts-loader'
                    }
                ],
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]__[hash]',
                            },
                        },
                    },
                    postcssRule,
                    'sass-loader',
                ],
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
        new TestPlugin(),
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
        new Dotenv(),
    ],
};

module.exports = (env, options) => {
    const isProd = options.mode === 'production';
    if (isProd) {
        config.devtool = false;
    }
    return config;
};