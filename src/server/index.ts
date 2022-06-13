import express from 'express';
//import { render } from './render/render'
import middleware from './render/hmr'
import path from "path";

const PORT = process.env.PORT || 8080

const app = express();

app.use(express.static(path.join(__dirname, '../../../dist/')));
app.use(middleware);

app.listen(PORT, () => {
    console.log('Server is running on port ', PORT);
})
