require('dotenv').config(); // para poder pegar as variaveis de ambiente

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes');
const { renderizaErrorPage, CSRFTokenMiddleware, insereParametrosPaginas } = require('./src/middlewares/middleware');

// Session e Flash-messages
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

// Helmet e csrf
const helmet = require('helmet');
const csrf = require('csurf');

const app = express();

// Base de dados pegando connection string do arquivo .env
mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => {
        console.log('Iniciei a base de dados.');
        app.emit('base iniciada'); // para iniciar o aplicativo somente quando conectar na base (emite sinal)
    })
    .catch(e => console.error(e));

/* MIDDLEWARES */

// Helmet
app.use(helmet());

// para tratar parametros recebidos via body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// configuracoes views
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// utilizar conteúdo estatico
app.use(express.static(path.join(__dirname, 'public')));

// configuracao de Session
const sessionOptions = session({
    secret: 'mySecret',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTION_STRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60,
        httpOnly: true
    }
});

app.use(sessionOptions);
app.use(flash()); // flash-messages

// CSRF
app.use(csrf());

// utilizando meu middleware global que criei
app.use(insereParametrosPaginas);
app.use(renderizaErrorPage);
app.use(CSRFTokenMiddleware);

// para utilizar as rotas definidas no arquivo routes
app.use(routes); 

// vai iniciar o servidor somente quando o sinal for emitido
app.on('base iniciada', () => {
    app.listen(3000, () => console.log('Servidor rodando na porta 3000 -> URL: http://localhost:3000/'));
})
