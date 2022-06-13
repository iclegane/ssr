import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Request, Response } from 'express';

import fs from "fs";
import path from "path";


export function render(req: Request, res: Response) {
    const { devMiddleware } = res.locals.webpack;
    const jsonWebpackStats = devMiddleware.stats.toJson();
    const { assetsByChunkName } = jsonWebpackStats;
    const script = assetsByChunkName.main[0];

    //const clientBundlePath = '../../../../dist/ssr.bundle';

    delete require.cache[require.resolve('../../../../dist/ssr.bundle.js')];

    const App = require('../../../../dist/ssr.bundle.js').default;

    //console.log(require.cache[require.resolve(clientBundlePath + '.js')])


    const reactHTML = ReactDOMServer.renderToString(<App />);
    const html = fs.readFileSync(path.join(__dirname, '../../../../src/assets/index.html'), {
        encoding: 'utf-8'
    });

    const response = html.replace(
        '<div id="root"></div>',
        `<div id="root">${reactHTML}</div>
                   <script src="${script}"></script>`
    );

    res.status(200).send(response);
}
