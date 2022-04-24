const bcryptjs = require('bcryptjs');

exports.geraHash = (valor) => {
    const salt = bcryptjs.genSaltSync();
    const hashGerado = bcryptjs.hashSync(valor, salt);

    return hashGerado;
};