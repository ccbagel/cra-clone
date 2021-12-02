const Autoprefixer = require("autoprefixer");
const path = require("path");

module.exports = {
    mode: "development",
    output: {
         filename: "static/js/bundle.js"
    },
    module : {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader", {
                    loader: "postcss-loader",
                    options: {
                        plugins: [new Autoprefixer()]
                    }
                }] 
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, '../public')
    }
}