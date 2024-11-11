const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const prodConfig = require('./webpack.pro.js');
const devConfig = require('./webpack.dev.js');
const { merge } = require('webpack-merge');

const commonConfig = (isProduction) => {
    return {
        entry: './index.js',
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: 'js/[id]_bundle.js',
            clean: true,
            chunkFilename: 'js/[id]_[name]_chunk.js', // 针对import()
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            alias: {
                pages: path.join(__dirname, './src/pages'),
                components: path.join(__dirname, './src/components'),
                routers: path.join(__dirname, './src/routers'),
                // actions: path.join(__dirname, '../src/redux/actions'),
                // reducers: path.join(__dirname, '../src/redux/reducers'),
                // images: path.join(__dirname, '../src/images')
            }
        },
        devServer: {            //配置热更新模块
            hot: true,
            open: true,
            port: 3500,
            static: {           // 将 contentBase 改为 static
                directory: path.join(__dirname, 'public'), // 指定静态文件的目录
            },
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './public/index.html',
                minify: isProduction ? {
                    removeComments: true, //移除注释
                    collapseWhitespace: true, //压缩空白区域
                } : false
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.tsx?$/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        // 'style-loader',
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        {
                            loader: 'css-loader',
                            // options: {
                            //     modules: true,
                            //     localIdentName: '[local]_[hash:base64:5]',
                            // }
                        },
                        // {
                        //     loader: 'postcss-loader',
                        //     options: {
                        //         plugins: [
                        //             require('autoprefixer')
                        //         ]
                        //     }
                        // },
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    localIdentName: '[local]_[hash:base64:5]',
                                }
                            }
                        },
                        // {
                        //     loader: 'postcss-loader',
                        //     options: {
                        //         plugins: [
                        //             require('autoprefixer')
                        //         ]
                        //     }
                        // },
                        'sass-loader'
                    ]
                },
                {
                    test: /\.less$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    localIdentName: '[local]_[hash:base64:5]',
                                }
                            }
                        },
                        // {
                        //     loader: 'postcss-loader',
                        //     options: {
                        //         plugins: [
                        //             require('autoprefixer')
                        //         ]
                        //     }
                        // },
                        'less-loader'
                    ]
                },
                {                                       //配置图片静态资源的打包信息
                    test: /\.(jpg|png|jpeg|gif)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 1024,
                                fallback: {
                                    loader: 'file-loader',
                                    options: {
                                        name: 'img/[name].[hash:8].[ext]'
                                    }
                                }
                            }
                        }
                    ]
                },
                {                                       //配置多媒体资源的打包信息
                    test: /\.(mp4|webm|ogg|mp3|wav)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 1024,
                                fallback: {
                                    loader: 'file-loader',
                                    options: {
                                        name: 'media/[name].[hash:8].[ext]'
                                    }
                                }
                            }
                        }
                    ]
                }
            ]
        },
    }
}


module.exports = function (env) {
    const isProduction = env.production;
    console.log('当前环境：', isProduction ? '生产环境' : '开发环境');
    let mergeConfig = isProduction ? prodConfig : devConfig;
    return merge(commonConfig(isProduction), mergeConfig);
}