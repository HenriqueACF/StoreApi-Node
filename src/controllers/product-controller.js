const mongoose = require('mongoose')
const Product = mongoose.model('Product')
//GET PRODUCTS
exports.get =(req, res, next) =>{
    Product
        .find({active:true}, 'title price slug')
        .then(data =>{
            res.status(200).send(data)
        }).catch(e =>{
            res.status(400).send(e)
    })
}

// GET PRODUCTS BY SLUG
exports.getBySlug =(req, res, next) =>{
    Product
        .findOne({
            slug:req.params.slug,
            active:true
        }, 'title description price slug tags')
        .then(data =>{
            res.status(200).send(data)
        }).catch(e =>{
        res.status(400).send(e)
    })
}

// GET PRODUCTS BY ID
exports.getById =(req, res, next) =>{
    Product
        .findById(req.params.id)
        .then(data =>{
            res.status(200).send(data)
        }).catch(e =>{
        res.status(400).send(e)
    })
}

// GET PRODUCTS BY TAG
exports.getByTag =(req, res, next) =>{
    Product
        .find({
            tags: req.params.tag,
            active: true
        })
        .then(data =>{
            res.status(200).send(data)
        }).catch(e =>{
        res.status(400).send(e)
    })
}

exports.post = (req,res,next) =>{
    var product = new Product(req.body)
    product
        .save()
        .then(x=>{
            res.status(201).send({message:'Produto cadastrado com sucesso'})
        })
        .catch(e=>{
            res.status(400).send({message:'Erro ao cadastrar produto', data:e})
        })
}

exports.put = (req,res,next)=> {
    const id = req.params.id
    res.status(200).send({
        id: id,
        item: req.body
    })
}

exports.delete = (req,res,next)=> {
    res.status(200).send(req.body)
}