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