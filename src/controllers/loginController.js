const Login = require('../models/LoginModel');

exports.index = (req, res) => {
    res.render('login');
};

exports.register = async (req, res) => {

    try {
        const login = new Login(req.body);
        await login.register();

        // exibir mensagens
        if (login.errors.length > 0) {
            req.flash('errors', login.errors);

            // salva seção
            req.session.save(function() {
                return res.redirect('/login/index'); // volta o formulario de onde ele veio
            });
            return;
        }

        req.flash('success', 'Usuário criado com sucesso.');
        req.session.save(function() {
            return res.redirect('/login/index');
        });
    } catch(e) {
        console.log(e);
        return res.render('error'); // renderiza pagina de erro
    }
};