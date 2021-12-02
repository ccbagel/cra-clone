const webpackMerge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = (env) => {
    return webpackMerge({
        entry: "./src/index.js",
        devtool: "source-map",
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: ["babel-loader"]
                },
                {
                    test: /\.(png | svg | jpe?g | webp | gif )$/,
                    use: [{
                        loader: "file-loader",
                        options: {
                            name: "static/media/[name].[contenthash:8].[ext]"
                        }
                    }]
                },
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "public/index.html",
                minify: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                templateParameters: {
                    PUBLIC_URL: ""
                    // href="<%= PUBLIC_URL %>/FILENAME>" />
                }
            })
        ]
    }, 
        require(`./build-utils/webpack.${env.mode}`)
    );
}  