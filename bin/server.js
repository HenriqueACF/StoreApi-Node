const app = require('../src/app')
const debug = require('debug')('node:serve');
const http = require('http');

// const swaggerUi = require('swagger-ui-express'),
//     swaggerDocument = require('../src/routes/indexRoutes');
//
// //ROTA SWAGGER
// app.use(
//     '/api-docs',
//     swaggerUi.serve,
//     swaggerUi.setup(swaggerDocument)
// );

const port = normalizePort(process.env.PORT || '3000')
app.set('port', port);

const server = http.createServer(app);

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)
console.log(`API Rodando em: ${port}`)

//NORMALIZE PORT
function normalizePort(val){
    const port = parseInt(val, 10);

    if(isNaN(port)){
        return val;
    }

    if (port >= 0){
        return port;
    }

    return false;
}

// TRATAMENTO DE ERROS NA PORTA
function onError(error){
    if (error.syscall !== 'listen'){
        throw error
    }

    const bind = typeof port === 'string' ? 'Pipe' + port : 'Port' + port

    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`)
            process.exit(1)
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`)
            process.exit(1)
            break;
        default:
            throw error

    }
}

//START DEBUGGER
function onListening(){
    const addr = server.address()
    const bind = typeof addr === 'string' ? 'pipe' + addr : 'port' + addr.port
    debug(`Listening on ${bind}`)
}
