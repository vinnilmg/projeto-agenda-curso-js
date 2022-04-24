const mongoose = require('mongoose');
const validator = require('validator');
const { geraHash, comparaHash } = require('../utils/utils');

const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    senha: { type: String, required: true },
});

const LoginModel = new mongoose.model('Login', LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async logarNoSistema() {
        this.validaFormulario();

        if (this.errors.length > 0) return;

        this.user = await LoginModel.findOne({ email: this.body.email });

        if (!this.user) {
            this.errors.push('Usuário ou senha inválidos');
            return;
        }

        // compara senha enviada com o hash da base
        if(!comparaHash(this.body.senha, this.user.senha)) {
            this.errors.push('Senha inválida.');
            this.user = null;
            return;
        }
    }

    async register() {
        this.validaFormulario();
        await this.usuarioExiste();

        if (this.errors.length > 0) return; // retorna pois tem algum erro
        
        this.body.senha = geraHash(this.body.senha); // hash gerado pelo bcrypt

        // cria no banco
        this.user = await LoginModel.create(this.body); 
    }

    async usuarioExiste() {
        const user = await LoginModel.findOne({ email: this.body.email });

        if (user) this.errors.push('Usuário já registrado.');
    }

    validaFormulario() {
        this.cleanUp();

        // verifica se o email é valido
        if (!validator.isEmail(this.body.email)) this.errors.push('Email inválido.');

        // verifica se a senha tem >= 3 e <= 50 caracteres
        if (this.body.senha.length < 3 || this.body.senha.length > 50) this.errors.push('Sua senha deve ter entre 3 e 50 caracteres.');
    }

    cleanUp() {
        // verifica se contém somente string
        for (let key in this.body) {
            if (typeof this.body[key] !== 'string') this.body[key] = '';
        }

        // permitir que o body tenha somente os campos que eu quero
        this.body = {
            email: this.body.email,
            senha: this.body.senha
        };
    }
}

module.exports = Login;
