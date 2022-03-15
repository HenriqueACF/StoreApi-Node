'use strict'

const http = require('http');
const debug = require('debug')('node:serve');
const express = require('express');

const app =express();
const port = 3000;
app.set('port', port);

const server = http.createServer(app);
const router = express.Router();

const route = router.get('/', (req, res, next) =>{
    res.status(200).send({
        title:"Node API",
        version:"0.0.1"
    });
});
app.use('/', route);

server.listen(port);
console.log(`API Rodando em: ${port}`);