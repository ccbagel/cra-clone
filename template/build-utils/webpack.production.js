const path = require("path");
const Autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    mode: "production",
     output: {
        path: path.resolve(__dirname, "../build"),
        filename: "static/js/[name].[contenthash:8].js",
        chunkFilename: "static/js/[id].chunk.[contenthash:8].js"
    },
    optimization: {
        splitChunks: {
            chunks: "all"
        },
        minimizer: [
            new TerserPlugin({
                sourceMap: true
            })
        ]
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: "postcss-loader",
                    options: {
                        plugins: [new Autoprefixer()]
                    }
                },
            ]
        }]
    },
    plugins: [
        new OptimizeCssAssetsPlugin({
            cssProcessorOptions: {
                map: {
                    annotation: true
                }
            }
        }),
        new MiniCssExtractPlugin({
            filename: "static/css/[name].[contenthash:8].css"
        }),
        new CopyWebpackPlugin([{
                from: 'public/',
                to: '.',
                ignore: ['index.html']
            }])
    ]
}