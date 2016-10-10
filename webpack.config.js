var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// var autoprefixer = require('autoprefixer');
// var precss = require('precss');
// var cssgrace = require('cssgrace');
// var filterGradient = require('postcss-filter-gradient');
// var atImport = require("postcss-import");
// var postcssUrl = require("postcss-url");
module.exports = {
    entry: {
        main : path.join(__dirname,"./examples/scripts/main.js")   
    },
    output: {
        path: path.join(__dirname,'dist'),
        // publicPath: "/bundles/",
        filename: "[name].bundle.js",
        chunkFilename: "[id].chunk.js"
    },
    module: {
        loaders: [
            { test : /\.css$/,  loader : ExtractTextPlugin.extract('style-loader','css-loader!postcss-loader')},
            { test : /\.less$/, loader : ExtractTextPlugin.extract('style-loader','css-loader!postcss-loader!less-loader')},
            { test : /\.jsx?$/, loader : 'babel' , exclude: /(node_modules|bower_components)/},
            // { test : /\.jsx?$/ , loader : 'babel-loader' , query:{ presets : ['es2015','react'] } , exclude: /(node_modules|bower_components)/},
            //如果不超过30000/1024kb,那么就直接采用dataUrl的形式,超过则返回链接,图片会复制到dist目录下
            { test: /\.(png|jpg|jpeg|gif)$/, loader: "url-loader?limit=30000" },
            { test: /\.(svg|ttf|eot|svg|woff(\(?2\)?)?)(\?[a-zA-Z_0-9.=&]*)?(#[a-zA-Z_0-9.=&]*)?$/, loader : "file-loader"}
        ]
    },

    resolve : {
        root : path.resolve('./')
    },

    postcss: function () {
        return [require('autoprefixer') , require('postcss-clearfix')];
    },
    plugins : [ 
        new webpack.DefinePlugin({
           "process.env" : {
                NODE_ENV : JSON.stringify("production")
            }
        }),
        new ExtractTextPlugin("[name].bundle.css",{allChunks: true}),
        new webpack.optimize.CommonsChunkPlugin("commons", "[name].bundle.js"),
        // new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template : 'examples/index.html',
            inject: true
            // filename: '../index.html',
        })
    ]
    // debug : true,
    // devtool : 'cheap-module-eval-source-map'
    //devServer 配置在webpack.dev.server.js 中
};