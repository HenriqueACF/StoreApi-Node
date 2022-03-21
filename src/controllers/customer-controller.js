const ValidationContract = require('../validators/fluent-validator')
const repository = require('../repositories/customer-repository')
const md5 = require('md5')
const emailService = require('../service/email-service')
const authService = require('../service/auth-service')

exports.post = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres');
    contract.isEmail(req.body.email, 3, 'E-mail inválido');
    contract.hasMinLen(req.body.password, 3, 'A senha deve conter pelo menos 6 caracteres');

    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create({
            name:req.body.name,
            email:req.body.email,
            password:md5(req.body.password + global.SALT_KEY)
        })
        emailService.send(req.body.email, "Teste de envio de email pela api feita em Node.js", global.EMAIL_TMPL.replace('{0}, req.body.name'))
        res.status(201).send({
            message: 'Cliente cadastrado com sucesso!'
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.authenticate = async(req, res, next) => {
    try {
        const customer =await repository.authenticate({
            email:req.body.email,
            password:md5(req.body.password + global.SALT_KEY)
        })

        if(!customer){
            res.status(404).send({message:"usuario ou senha invalidos"});
            return
        }
        const token = await authService.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name
        })

        res.status(201).send({
            token: token,
            data:{
               email: customer.email,
               password: customer.password
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};