const mongoose = require('mongoose');
const validator = require('validator');

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

    async register() {
        this.validaFormulario();

        if (this.errors.length > 0) return; // tem erro
        
        try {
            // passou sem erro e agora vai criar o usuário na base
            this.user = await LoginModel.create(this.body);
        } catch (err) {
            console.log(err) ;
        }   
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
