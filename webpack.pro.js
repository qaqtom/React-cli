const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const cssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const webpack = require('webpack');
const compressionPlugin = require('compression-webpack-plugin');

module.exports = {
    mode: 'production',
    devtool: false,
    // 优化配置
    optimization: {
        usedExports: true,
        splitChunks: {
            chunks: 'all', // 默认async  all是将node_modules里的全部放在一起打包
            // maxSize: 200000, // 最大尺寸
            minSize: 0, // 默认值20kb
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/, // 为了兼容mac和windows
                    filename: 'js/[id]_vendor.js',
                },
                //打包公共模块
                commons: {
                    chunks: 'initial', //initial表示提取入口文件的公共部分
                    minChunks: 2, //表示提取公共部分最少的文件数
                    minSize: 0, //表示提取公共部分最小的大小
                    name: 'commons' //提取出来的文件命名
                }
            }
        },
        minimize: true,
        minimizer: [
            // js优化
            new TerserPlugin({
                extractComments: false, // 去除注释(默认生成一个txt文件记录一些信息注释)
                terserOptions: {
                    compress: {
                        arguments: true, // arguments变量名压缩
                        unused: true, // 移除未使用的变量

                    },
                    mangle: true,
                    toplevel: true, // 顶层变量名压缩
                }
            }),
            // css优化
            new cssMinimizerPlugin({
                parallel: true, // 并行压缩
            })
        ],
        chunkIds: 'deterministic', // 生成的chunkId算法，开发环境下默认值为named 生产环境下默认值为deterministic
        // runtimeChunk: { // 单独打包runtime文件,vue3和react新版脚手架中已废弃
        //     name: 'runtime',
        // }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name]_[hash:4].css',
            chunkFilename: 'css/qaq[id]_[hash:4].css'
        }),
        new webpack.optimize.ModuleConcatenationPlugin(), // 模块合并  把模块合并到一个文件里，执行另一个作用域的函数不需要去其他作用域取了
        // http压缩
        new compressionPlugin({
            test: /\.(js|css)$/, // 匹配文件名
            minRatio: 0.8, // 压缩率, 达到0.8的压缩率才会压缩
        })
    ]
}