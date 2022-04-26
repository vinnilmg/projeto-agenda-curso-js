import validator from 'validator';

export default class LoginValidacao {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    }

    events() {
        console.log('Validando...');
        if (!this.form) return;

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.valida(e);
        })
    }

    valida(e) {
        const el = e.target;
        const emailInput = el.querySelector('input[name="email"]');
        const senhaInput = el.querySelector('input[name="senha"]');
        let error = false;

        console.log(el);

        if (!validator.isEmail(emailInput.value)) {
            alert('Você deve preencher um email válido.');
            error = true;
        }

        if (senhaInput.value.length < 3 || emailInput.value.length > 50) {
            alert('Digitar senha válida entre 3 e 50 caracteres.');
            error = true;
        }

        if (!error) el.submit();
    }

};