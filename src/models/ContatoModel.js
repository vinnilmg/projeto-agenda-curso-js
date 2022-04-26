const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    telefone: { type: String, required: false, default: '' },
    criadoEm: { type: Date, default: Date.now }
});

const ContatoModel = new mongoose.model('Contato', ContatoSchema);

class Contato {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.contato = null;
    }

    async register() {
        this.valida();

        if (this.errors.length > 0) return;

        this.contato = await ContatoModel.create(this.body); // cria o contato na base e atribui a variável
    }

    valida() {
        this.cleanUp();

        if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Email inválido.');

        if (!this.body.nome) this.errors.push('Seu nome é obrigatório.');

        if (!this.body.email && !this.body.telefone) this.errors.push('Você deve informar um meio de contato.');
    }

    cleanUp() {
        for (let key in this.body) {
            if (typeof this.body[key] !== 'string') this.body[key] = '';
        }

        this.body = {
            nome: this.body.nome,
            sobrenome: this.body.sobrenome,
            email: this.body.email,
            telefone: this.body.telefone
        };
    }

    async edit(id) {
        if (typeof id != 'string') return;

        this.valida();

        if (this.errors.length > 0) return;

        this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true }); // atualiza e retorna os dados atualizados
    }

    static async buscaPorId(id) {
        // verifica tipo do id
        if (typeof id != 'string') return;

        return await ContatoModel.findById(id);
    }

    static async buscaContatos() {
        return await ContatoModel.find().sort({ criadoEm: -1 }); // ordenando pela ordem decrescente (-1), 1 seria para crescente
    }

    static async deletarContato(id) {
        if (typeof id != 'string') return;

        return await ContatoModel.findOneAndDelete({_id: id});
    }

}

module.exports = Contato;
