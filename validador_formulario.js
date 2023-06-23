
class Formulario {
    constructor() {
        this.nome = document.querySelector('input#nome');
        this.sobrenome = document.querySelector('input#sobrenome');
        this.cpf = document.querySelector('input#cpf');
        this.usuario = document.querySelector('input#usuario');
        this.senha = document.querySelector('input#senha');
        this.repetirSenha = document.querySelector('input#repetir-senha')
        this.ajusteFormDiv = document.querySelector('div.erro-formulario')
        this.inputs = document.getElementsByClassName('inputs')
        this.btnEnviar = document.querySelector('input.btn-enviar')
        this.btnLimpar = document.querySelector('input.btn-limpar')

        this.adicionaEventos()

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

    adicionaEventos() {
        this.cpf.addEventListener('blur', () => { this.formataCPF() })
        this.cpf.addEventListener('focus', () => { this.voltaCPF() })
        this.btnEnviar.addEventListener('click', () => { this.enviaFormulario() })
        this.btnLimpar.addEventListener('click', () => { this.limparFormulario() })
    }

    formataCPF() {
        this.cpf.value = this.cpf.value.replace(/\D+/g, '')
        this.cpf.value = this.cpf.value.slice(0, 3) + '.' + this.cpf.value.slice(3, 6) + '.' + this.cpf.value.slice(6, 9) + '-' + this.cpf.value.slice(9, 11)
    }

    voltaCPF() {
        this.cpf.value = this.cpf.value.replace(/\D+/g, '')
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
            return true
        }
    }

    validaUsuarioCaracter() {
        const testeUsuario = this.usuario.value.replace(/[a-zA-Z0-9]/g, '')
        if (testeUsuario.length !== 0) {
            return false
        } else {
            return true
        }
    }

    validaUsuarioComprimento() {
        if (this.usuario.value.length < 3 || this.usuario.value.length > 12) {
            return false
        } else {
            return true
        }
    }

    validaSenha() {
        if (this.senha.value.length < 6 || this.senha.value.length > 12) {
            return false
        } else {
            return true
        }
    }

    validaRepetirSenha() {
        if (this.senha.value !== this.repetirSenha.value) {
            return false
        } else {
            return true
        }
    }

    validaPreenchimento() {
        for (let i = 0; i <= this.inputs.length - 1; i++) {
            if (this.inputs[i].value === '') {
                return false
            }
        }
        for (let i = 0; i <= this.inputs.length - 1; i++) {
            if (this.inputs[i].value !== '') {
                return true
            }
        }
    }

    criaDivTitulo(){
        let divTitulo = document.createElement('h3')
        divTitulo.innerText = 'Ajuste o seu formulário'
        this.ajusteFormDiv.appendChild(divTitulo) 
        return divTitulo
    }

    criaErro(mensagemErro) {
        let criaErro = document.createElement('p')
        criaErro.innerText = mensagemErro
        criaErro.classList.add('aparece')
        this.ajusteFormDiv.appendChild(criaErro)
        return criaErro
    }

    validaFormulario() {

        let validador = true

        this.ajusteFormDiv.innerHTML = ''
        this.criaDivTitulo()

        if (this.validaPreenchimento() === false) {
            if (this.criaErro('Todos os campos do formulário devem ser preenchidos.').classList.contains('aparece')) { this.criaErro().remove() }
            validador = false
        }

        if (this.validaCPF() === false) {
            if (this.criaErro('Deve ser informado um número de CPF válido.').classList.contains('aparece')) 
            { this.criaErro().remove() }
            validador = false
        }

        if (this.validaUsuarioCaracter() === false) {
            if (this.criaErro('O campo "usuário" deve conter apenas letras e/ou números.').classList.contains('aparece')) { this.criaErro().remove() }
            validador = false
        }

        if (this.validaUsuarioComprimento() === false) {
            if (this.criaErro(' O campo "usuário" deve conter entre 3 e 12 caracteres.').classList.contains('aparece')) { this.criaErro().remove() }
            validador = false
        }
 
        if (this.validaSenha() === false) {
            if (this.criaErro('O campo "senha" deve conter entre 6 e 12 caracteres.').classList.contains('aparece')) { this.criaErro().remove() }
            validador = false
        }
  
        if (this.validaRepetirSenha() === false) {
            if (this.criaErro('As senhas informadas devem ser iguais.').classList.contains('aparece')) 
            { this.criaErro().remove() }
            validador = false
        }

        if (validador === false) {
            this.ajusteFormDiv.classList.remove('desaparece')
            this.ajusteFormDiv.classList.add('aparece')
        } else {
            this.ajusteFormDiv.classList.remove('aparece')
            this.ajusteFormDiv.classList.add('desaparece')
        }

        return validador
    }

    enviaFormulario() {
        if (this.validaFormulario() === true) {
            console.log('O formulário está apto a ser enviado!')
        } else {
            console.log('Ajuste as pendências do formulário antes de envia-lo!')
        }
    }

    limparFormulario() {
        for (let i = 0; i <= this.inputs.length - 1; i++) {
            this.inputs[i].value = ''
        }
        this.ajusteFormDiv.classList.remove('aparece')
        this.ajusteFormDiv.classList.add('desaparece')
    }
}

const form1 = new Formulario()
