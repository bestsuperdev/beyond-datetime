var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
// var ExtractTextPlugin = require("extract-text-webpack-plugin");
// var autoprefixer = require('autoprefixer');
// var precss = require('precss');
// var cssgrace = require('cssgrace');
// var filterGradient = require('postcss-filter-gradient');
// var atImport = require("postcss-import");
// var postcssUrl = require("postcss-url");
module.exports = {
    context: path.join(__dirname,'./examples/scripts'),
    entry: {
        time : './time.js',   
        calendar : './calendar.js',   
        range : './range.js',
        commons : ['react','react-dom']
    },
    output: {
        path: path.join(__dirname,'hot'),
        // publicPath: "/bundles/",
        filename: "[name].[hash].bundle.js",
        chunkFilename: "[id].[hash].chunk.js"
    },
    module: {
        loaders: [
            { test : /\.css$/,  loader : 'style-loader!css-loader!postcss-loader' },
            { test : /\.less$/, loader : 'style-loader!css-loader!postcss-loader!less-loader'},
            { test : /\.jsx?$/, loader : 'babel', exclude: /(node_modules|bower_components)/},
            { test : /\.(png|jpg|jpeg|gif)$/, loader : "url-loader?limit=30000" },
            { test : /\.(svg|ttf|eot|svg|woff(\(?2\)?)?)(\?[a-zA-Z_0-9.=&]*)?(#[a-zA-Z_0-9.=&]*)?$/, loader : "file-loader"}
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
                NODE_ENV : JSON.stringify("development")
            }
        }),
        new webpack.optimize.CommonsChunkPlugin("commons", "[name].bundle.js"),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            chunks : ['commons','time'],
            template : path.join(__dirname,'examples/index.html') ,
            inject: true,
            filename: 'time.html',
        }),
        new HtmlWebpackPlugin({
            chunks : ['commons','calendar'],
            template : path.join(__dirname,'examples/index.html') ,
            inject: true,
            filename: 'calendar.html',
        }),
        new HtmlWebpackPlugin({
            chunks : ['commons','range'],
            template : path.join(__dirname,'examples/index.html') ,
            inject: true,
            filename: 'range.html',
        })
    ],
    debug : true,
    devtool :'#inline-source-map'
    //devServer 配置在webpack.dev.server.js 中
};