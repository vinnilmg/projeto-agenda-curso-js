import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './assets/css/style.css';
import Login  from './modules/LoginValidacacao';

console.log('JS iniciado.');

// Validando formulários de Login e Cadastro de usuários
const formLogin = new Login('.form-login'); 
const formCadastro = new Login('.form-cadastro'); 

formLogin.init();
formCadastro.init();