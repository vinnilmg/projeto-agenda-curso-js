exports.renderizaErrorPage = (err, req, res, next) => {
    if (err) {
        console.log(err);

        // renderizando pagina de erro para nao exibir o erro na tela
        res.render('error'); 
    }

    next();
};

exports.CSRFTokenMiddleware = (req, res, next) => {
    // Enviando token pra todas as requisições
    res.locals.csrfToken = req.csrfToken();
    next();
};

exports.insereParametrosPaginas = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    next();
};

exports.loginRequired = (req, res, next) => {
    if(!req.session.user) {
        req.flash('errors', 'Você precisa fazer login.');
        req.session.save(() => res.redirect('/'));
        return;
    }

    next(); // se estiver logado, passa pra frente
};