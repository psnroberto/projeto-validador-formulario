
const ajusteFormDiv = document.querySelector('div.erro-formulario')
const ajusteFormParagrafo = document.getElementsByClassName('erro-paragrafo')
const inputs = document.getElementsByClassName('inputs')
const nome = document.querySelector('input#nome');
const sobrenome = document.querySelector('input#sobrenome');
const cpf = document.querySelector('input#cpf');
const usuario = document.querySelector('input#usuario');
const senha = document.querySelector('input#senha');
const repetirSenha = document.querySelector('input#repetir-senha');
const btnEnviar = document.querySelector('input.btn-enviar')
const btnLimpar = document.querySelector('input.btn-limpar')

btnEnviar.addEventListener('click', enviaFormulario)
btnLimpar.addEventListener('click', limparFormulario)
cpf.addEventListener('blur', formataCPF)
cpf.addEventListener('focus', voltaCPF)

function formataCPF() {
    cpf.value = cpf.value.replace(/\D+/g, '')
    cpf.value = cpf.value.slice(0, 3) + '.' + cpf.value.slice(3, 6) + '.' + cpf.value.slice(6, 9) + '-' + cpf.value.slice(9, 11)
}

function voltaCPF() {
    if (cpf.value === '') {
        cpf.value === ''
    } else {
        cpf.value = cpf.value.replace(/\D+/g, '')
    }
}

function enviaFormulario() {
    if (form1.validaFormulario() === true) {
        console.log('O formulário está apto a ser enviado!')
    } else {
        console.log('Ajuste as pendências do formulário antes de envia-lo!')
    }
}

function limparFormulario() {
    for (let i = 0; i <= inputs.length - 1; i++) {
        inputs[i].value = ''
    }
    ajusteFormDiv.style.display = 'none'
}

class Formulario {
    constructor(nome, sobrenome, cpf, usuario, senha, repetirSenha) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.cpf = cpf;
        this.usuario = usuario;
        this.senha = senha;
        this.repetirSenha = repetirSenha
    }

    get cpfLimpo() {
        this.cpf.value = this.cpf.value.replace(/\D+/g, '')
        return this.cpf.value
    }

    get cpfReduzido() {
        return this.cpfLimpo.slice(0, -2)
    }

    get novoCPF() {
        const digito1 = this.criaDigito(this.cpfReduzido)
        const digito2 = this.criaDigito(this.cpfReduzido + digito1)
        const novoCPF = this.cpfReduzido + digito1 + digito2

        return novoCPF
    }

    criaDigito(cpfNovo) {
        const cpfDigito = String(cpfNovo)
        let cpfArray = Array.from(cpfDigito);
        cpfArray = cpfArray.map(Number, this)
        let soma = Number('')
        let digito = ''

        for (let i = 0; i <= cpfArray.length - 1; i++) {
            soma = soma + ((cpfArray[i]) * (cpfArray.length + 1 - i))
        }
        if (soma % 11 === 0 || soma % 11 === 1) {
            digito = 0
        } else if (soma % 11 > 2 && soma % 11 <= 10) {
            digito = 11 - (soma % 11)
        }

        return String(digito)
    }

    verificaSequencia() {
        const verificaSequencia = this.novoCPF[0].repeat(this.novoCPF.length)
        if (verificaSequencia === this.novoCPF) return true
    }

    validaCPF() {
        if (typeof this.cpfLimpo !== 'string' ||
            this.cpfLimpo.length !== 11 ||
            this.verificaSequencia() === true) {
            return false
        } else if (this.novoCPF === this.cpfLimpo) {
            ajusteFormParagrafo[0].style.display = 'none'
            return true
        }
    }

    validaUsuarioCaracter() {
        const testeUsuario = this.usuario.value.replace(/[a-zA-Z0-9]/g, '')
        if (testeUsuario.length !== 0) {
            return false
        } else {
            ajusteFormParagrafo[1].style.display = 'none'
            return true
        }
    }

    validaUsuarioComprimento() {
        if (this.usuario.value.length < 3 || this.usuario.value.length > 12) {
            return false
        } else {
            ajusteFormParagrafo[2].style.display = 'none'
            return true
        }
    }

    validaSenha() {
        if (this.senha.value.length < 6 || this.senha.value.length > 12) {
            return false
        } else {
            ajusteFormParagrafo[3].style.display = 'none'
            return true
        }
    }

    validaRepetirSenha() {
        if (this.senha.value !== this.repetirSenha.value) {
            return false
        } else {
            ajusteFormParagrafo[4].style.display = 'none'
            return true
        }
    }

    validaPreenchimento() {
        for (let i = 0; i <= inputs.length - 1; i++) {
            if (inputs[i].value === '' || inputs[i].value === 'undefined') {
                return false
            }
        }
        for (let i = 0; i <= inputs.length - 1; i++) {
            if (inputs[i].value !== '') {
                ajusteFormParagrafo[5].style.display = 'none'
                return true
            }
        }
    }

    validaFormulario() {

        let validador = true

        if (this.validaCPF() === false) {
            ajusteFormParagrafo[0].style.display = 'block'
            validador = false
        }
        if (this.validaUsuarioCaracter() === false) {
            ajusteFormParagrafo[1].style.display = 'block'
            validador = false
        }
        if (this.validaUsuarioComprimento() === false) {
            ajusteFormParagrafo[2].style.display = 'block'
            validador = false
        }
        if (this.validaSenha() === false) {
            ajusteFormParagrafo[3].style.display = 'block'
            validador = false
        }
        if (this.validaRepetirSenha() === false) {
            ajusteFormParagrafo[4].style.display = 'block'
            validador = false
        }
        if (this.validaPreenchimento() === false) {
            ajusteFormParagrafo[5].style.display = 'block'
            validador = false
        }

        if (validador === false) {
            ajusteFormDiv.style.display = 'block'
        } else {
            ajusteFormDiv.style.display = 'none'
        }

        return validador
    }
}

const form1 = new Formulario(nome, sobrenome, cpf, usuario, senha, repetirSenha)