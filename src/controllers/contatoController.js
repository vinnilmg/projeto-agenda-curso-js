const Contato = require('../models/ContatoModel');

exports.index = (req, res) => {
    return res.render('contato', { contato: {} }); // enviando contato vazio para nao quebrar a pagina
};

exports.register = async (req, res) => {
    try {
        const contato = new Contato(req.body);
        await contato.register();

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('/contato/index'));
            return;
        } 
        
        req.flash('success', 'Contato criado com sucesso.');
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`)); // direciona pra tela de edição do contato
       
    } catch(e) {
        console.log(e);
        return res.render('error');
    }
};

exports.editIndex = async (req, res) => {
    if(!req.params.id) return res.render('error');

    try {
        const contato = await Contato.buscaPorId(req.params.id); // funcao static

        if (!contato) return res.render('error');

        return res.render('contato', { contato }); // renderizo tela de contato passando o objeto
    
    } catch(e) {
        console.log(e);
        return res.render('error');
    }
};

exports.edit = async function(req, res) {
    if(!req.params.id) return res.render('error');

    try {
        const contato = new Contato(req.body);
        await contato.edit(req.params.id);

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors);
        } else {
            req.flash('success', 'Contato atualizado com sucesso.');
        }
     
        req.session.save(() => res.redirect(`/contato/index/${req.params.id}`)); // redireciona novamente pra pagina de edicao

    } catch(err) {
        console.log(err);
        return res.render('error');
    }
};

exports.delete = async (req, res) => {
    if(!req.params.id) return res.render('error'); 

    try {
        const contato = await Contato.deletarContato(req.params.id);

        if (!contato) return res.render('error');

        req.flash('success', `Você deletou o contato: ${contato.nome}`);
        req.session.save(() => res.redirect('/'));

    } catch(err) {
        console.log(err);
        return res.render('error');
    }
};