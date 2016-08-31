module.exports = {
    entry: './index.js',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    module: {
        noParse: ['fs'],
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node-modules/
            }, {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            }
            , {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            }, {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    }
    externals: ['ws']
}
