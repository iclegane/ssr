import webpack from "webpack";
import config from "../../../webpack.config";
import devMiddleware from 'webpack-dev-middleware';
import {render} from "./render";

// @ts-ignore
import hotMiddleware from "@gatsbyjs/webpack-hot-middleware";

const compiler = webpack({
    ...config,
    mode:'development'
})

export default [
    devMiddleware(compiler, {
        serverSideRender: true,
        index: false,
        publicPath: config.output.publicPath
    }),
    hotMiddleware(compiler, {
       path: '/__webpack_hmr',
       log: false,
    }),
    render
];
