const Login = require('../models/LoginModel');

exports.index = (req, res) => {

    if (req.session.user) return res.render('logado');

    return res.render('login');
};

exports.register = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.register();

        // exibir mensagens
        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
        } else {
            req.flash('success', 'Usuário criado com sucesso.');
        }

        // salva seção e redireciona pagina
        req.session.save(function() {
            return res.redirect('/login/index');
        });

    } catch(e) {
        console.log(e);
        return res.render('error'); // renderiza pagina de erro
    }
};

exports.logar = async function (req, res) {
    try {
        const login = new Login(req.body);
        await login.logarNoSistema();

        if (!login.user) {
            req.flash('errors', login.errors);
        } else {
            req.flash('success', 'Bem vindo! Você está ONLINE no sistema!');
            req.session.user = login.user;
        }

        // salva seção e redireciona pagina
        req.session.save(function() {
            return res.redirect('/login/index');
        });

    } catch(e) {
        console.log(e);
        return res.render('error');
    }
};

exports.sair = function (req, res) {
    req.session.destroy(); // remove sessao
    return res.redirect('/');
};