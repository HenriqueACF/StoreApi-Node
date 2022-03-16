const mongoose = require('mongoose')
const Product = mongoose.model('Product')
const ValidationContract = require('../validators/fluent-validator')
const repository = require('../repositories/product-repository')

//GET PRODUCTS
exports.get =(req, res, next) =>{
    repository
        .get()
        .then(data =>{
            res.status(200).send(data)
        }).catch(e =>{
            res.status(400).send(e)
    })
}

// GET PRODUCTS BY SLUG
exports.getBySlug =(req, res, next) =>{
    repository
        .getBySlug(req.params.slug)
        .then(data =>{
            res.status(200).send(data)
        }).catch(e =>{
        res.status(400).send(e)
    })
}

// GET PRODUCTS BY ID
exports.getById =(req, res, next) =>{
    repository
        .getById(req.params.id)
        .then(data =>{
            res.status(200).send(data)
        }).catch(e =>{
        res.status(400).send(e)
    })
}

// GET PRODUCTS BY TAG
exports.getByTag =(req, res, next) =>{
    repository
        .getByTag()
        .then(data =>{
            res.status(200).send(data)
        }).catch(e =>{
        res.status(400).send(e)
    })
}

exports.post = (req,res,next) =>{
    let contract = new ValidationContract()
    contract.hasMinLen(req.body.title, 3, 'O titulo deve conter pelo menos 3 caracteres')
    contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres')
    contract.hasMinLen(req.body.description, 3, 'A descrição deve conter pelo menos 3 caracteres')

    //VERIFICA SE OS DADOS SAO INVALIDOS
    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end()
        return
    }

    repository
        .create(req.body)
        .then(x=>{
            res.status(201).send({message:'Produto cadastrado com sucesso'})
        })
        .catch(e=>{
            res.status(400).send({message:'Erro ao cadastrar produto', data:e})
        })
}

exports.put = (req,res,next)=> {
    repository
        .update(req.params.id, req.body)
        .then(x =>{
            res.status(200).send({
                message:'Produto atualizado com sucesso'
            })
        }).catch(e => {
            res.status(400).send({
                message:'Falha ao atualizar produto',
                data:e
        })
    })
}

exports.delete = (req,res,next)=> {
    repository
        .delete(req.body.id)
        .then(x =>{
        res.status(200).send({
            message:'Produto deletado com sucesso'
        })
    }).catch(e => {
        res.status(400).send({
            message:'Falha ao deletar produto',
            data:e
        })
    })
}