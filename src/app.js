const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const router = express.Router()

//IMPORTANDO AS ROTAS
const indexRoutes = require('./routes/indexRoutes')
const productRoute = require('./routes/productRoute')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use('/', indexRoutes)
app.use('/products', productRoute)

module.exports = app;


//STATUS HTTP
//200 -> OK
// 201 -> CRIADO
// 400 -> BADREQUEST
//401 -> NAO AUTENTICADO
//403 -> NAO AUTORIZADO
//500 -> ERRO INTERNO
