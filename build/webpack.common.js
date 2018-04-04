const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');
const spriteTemplate = require('./spriteTemplate');
const websiteConfig = require("../config");

const filePaths = {
    dev: "./src/",
    dist: "../dist/",
    js: "../src/js/",
    sass: "./src/sass/",
    images: "./src/images/"
};

const config = {
    entry: {
        app: [
            path.resolve(__dirname, filePaths.js + 'app.js')
        ]
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: "html-loader",
                exclude: /index\.html$/,
            },
            {
                test: /\.(png|svg|jpg|gif|ico)$/,
                use: ['file-loader?name=i/[hash].[ext]']
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: ["@babel/plugin-transform-runtime"]
                    }
                }
            }
        ]
    },
    resolve: {
        modules: ["node_modules", "spritesmith-generated"]
    },
    plugins: [
        // 自动生成index.html
        new HtmlWebpackPlugin(Object.assign({
            favicon: filePaths.images + "favicon.ico",
            template: filePaths.dev + 'index.html',
            hash: true,
            inject: true,
            minify: {
                removeComments: true,        //去注释
                collapseWhitespace: true,    //压缩空格
                removeAttributeQuotes: true  //去除属性引用
            }
        }, websiteConfig)),
        new SpritesmithPlugin({
            src: {
                cwd: path.resolve(__dirname, '../src/images/icons'),
                glob: '*.png'
            },
            target: {
                image: path.resolve(__dirname, '../src/images/sprite.png'),
                css: [
                    [path.resolve(__dirname, '../src/sass/_sprite.scss'), {
                        format: 'function_based_template'
                    }]
                ]
            },
            customTemplates: {
                'function_based_template': spriteTemplate(websiteConfig.templateParameters.useRem, websiteConfig.templateParameters.remConfig.baseSize)
            },
            apiOptions: {
                cssImageRef: "../images/sprite.png"
            },
            spritesmithOptions: {
                padding: 10
            }
        })
    ]
};

module.exports = {
    config,
    filePaths
};