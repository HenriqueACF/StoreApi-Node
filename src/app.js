const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config')

const app = express()
const router = express.Router()

//CONECTA COM O BANCO
mongoose.connect(config.connectionString);

//MODELS
const Product = require('./models/product')
const Customer = require('./models/customer')
const Order = require('./models/order')

//IMPORTANDO AS ROTAS
const indexRoutes = require('./routes/indexRoutes')
const productRoute = require('./routes/productRoute')
const customerRoute = require('./routes/customerRoute')
const orderRoute = require('./routes/orderRoute')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use('/', indexRoutes)
app.use('/products', productRoute)
app.use('/customers', customerRoute)
app.use('/orders', orderRoute)

module.exports = app;


//STATUS HTTP
//200 -> OK
// 201 -> CRIADO
// 400 -> BADREQUEST
//401 -> NAO AUTENTICADO
//403 -> NAO AUTORIZADO
//500 -> ERRO INTERNO
