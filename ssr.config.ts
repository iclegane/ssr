const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');


module.exports = () => {
    return {
        mode: 'development',
        entry: './src/client/App.tsx',
        target: 'node',
        output: {
            filename: 'ssr.bundle.js',
            path: path.join(__dirname, '/dist'),
            publicPath: '/',
            libraryTarget: 'commonjs2'
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', 'jsx'],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node-modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react',
                                '@babel/preset-typescript',
                            ]
                        }
                    }
                }
            ],
        },
        externals: [webpackNodeExternals()]
    }
};
