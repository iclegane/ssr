import path from 'path';
import { HotModuleReplacementPlugin } from 'webpack';
import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";

export default {
    mode: 'development',
    entry: ['@gatsbyjs/webpack-hot-middleware/client?path=/__webpack_hmr', './src/client/index.tsx'],
    target: 'web',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'client.bundle.js',
        publicPath: '/'
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
                        ],
                        plugins: [
                            'react-refresh/babel'
                        ]
                    }
                }
            }
        ],
    },
    plugins: [
        new HotModuleReplacementPlugin(),
        new ReactRefreshPlugin({
            overlay: {
                sockIntegration: 'whm'
            }
        }),
    ],
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        historyApiFallback: true,
        compress: true,
        port: 3000,
        open: true,
        hot: true,
    }
};
