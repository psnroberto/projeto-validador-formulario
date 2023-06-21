
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
    cpf.value = cpf.value.replace(/\D+/g, '')
}

function enviaFormulario() {

    const form1 = new Formulario(nome, sobrenome, cpf, usuario, senha, repetirSenha)

    form1.validaFormulario()

    // console.log(nome.value)
    // console.log(sobrenome.value)
    // console.log(cpf.value)
    // console.log(usuario.value.length)
    // console.log(senha.value)
    // console.log(repetirSenha.value)

}

function limparFormulario() {
    for (let i = 0; i <= inputs.length - 1; i++) {
        inputs[i].value = ''
    }
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
            this.cpf.value === '' ||
            this.cpfLimpo.length !== 11 ||
            this.verificaSequencia() === true) {
            ajusteFormDiv.style.display = 'block'
            ajusteFormParagrafo[0].style.display = 'block'
        } else {
            ajusteFormParagrafo[0].style.display = 'none'
        }
        if (this.novoCPF === this.cpfLimpo) return true
    }

    validaUsuario() {
        const testeUsuario = this.usuario.value.replace(/[a-zA-Z0-9]/g, '')
        if (testeUsuario.length !== 0) {
            ajusteFormParagrafo[1].style.display = 'block'
        } else {
            ajusteFormParagrafo[1].style.display = 'none'
        }

        if (this.usuario.value.length < 3 || this.usuario.value.length > 12) {
            ajusteFormParagrafo[2].style.display = 'block'
        } else {
            ajusteFormParagrafo[2].style.display = 'none'
        }

    }

    validaSenha() {
        if (this.senha.value.length < 6 || this.senha.value.length > 12) {
            ajusteFormParagrafo[3].style.display = 'block'
        } else {
            ajusteFormParagrafo[3].style.display = 'none'
        }

        if (this.senha.value !== this.repetirSenha.value) {
            ajusteFormParagrafo[4].style.display = 'block'
        } else {
            ajusteFormParagrafo[4].style.display = 'none'
        }

    }

    validaPreenchimento(){
        for (let j = 0; j <= inputs.length - 1; j++) {
            if (inputs[j].value === '') {
                ajusteFormDiv.style.display = 'block'
                ajusteFormParagrafo[5].style.display = 'block'
            } else {
                // ajusteFormParagrafo[5].style.display = 'none'
            }
        }
    }

    validaFormulario() {
        
        ajusteFormDiv.style.display = 'none'
        
        this.validaCPF()
        this.validaUsuario()
        this.validaSenha()
        this.validaPreenchimento()
    }
}

