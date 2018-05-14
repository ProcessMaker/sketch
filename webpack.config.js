const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')


module.exports = {
    mode: 'development',
    entry: './src/sketch.js',
    output: {
        filename: 'sketch.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/sketch/'
    },
    module: {
        rules: [
            // Vue loader
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    plugins: [
        // make sure to include the plugin!
        new VueLoaderPlugin(),
        new CopyWebpackPlugin([
            {
                from: 'src/icons/**/*',
                to: 'icons/',
                flatten: true
            }
         ])
    ],
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    }
};