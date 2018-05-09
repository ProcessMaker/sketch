const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')


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
        new VueLoaderPlugin()
    ],
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    }
};