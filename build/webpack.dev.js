const merge = require('webpack-merge');
const {config, filePaths} = require('./webpack.common.js');
const webpack = require('webpack');
const websiteConfig = require("../config");

module.exports = merge(config, {
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader?sourceMap",
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: {path: "./build/postcss.config.js"}
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                            data: (
                                websiteConfig.templateParameters.useReam ? "$baseSize:" + websiteConfig.templateParameters.remConfig.baseSize + ";" : ""
                            )
                        }
                    }
                ]
            }
        ]
    },
    devServer: {
        contentBase: filePaths.dev,
        hot: true,
        proxy: {
            "/api": "http://api.yihaoguanwang.com"
        }
    },
    devtool: 'inline-source-map',
    plugins: [
        // 支持热更新模块
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            Mock: 'mockjs'
        })
    ]
});
