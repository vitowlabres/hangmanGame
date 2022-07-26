// ====================== VARIÁVEIS E CONSTANTES INICIAIS ======================

const popUp = document.querySelector('.popup');
const textoPopUp = document.querySelector('.texto-popup');
const botaoFechar = document.querySelector('.fechar');
const botaoOkPopup = document.querySelector('.ok-popup');
const numeroDesconto = document.querySelector('.numero-desconto')
const botaoInfo = document.querySelector('.button-informacao');
// const instrucoes = document.querySelector('.container-instrucoes');
const botaoSortear = document.querySelector('.button-sortear');
const todosBotoesLetra = document.querySelectorAll('.button-letra');
const botaoDica = document.querySelector('.button-dica');
const todasDicas = document.querySelectorAll('.div-dicas')
// const palavraSorteada = document.getElementById("palavra-sorteada");
const listaDicas = document.querySelectorAll('.div-dicas');

var wrongTries = []
var rightTries = []
var listaDePalavras = ['CAMISETA', 'CALCA', 'BONE', 'CACHECOL', 'RELOGIO', 'MEIA', 'CARTEIRA'];
let dicas = {
    "CAMISETA": [
      "É perfeita para dias quentes.",
      "Pode ser 100% algodão.",
      "É possível colocar uma estampa nela ou bordar."
    ],
    "CALCA": [
        "Possui bolsos para você guardar seus pertences.",
        "Tem para todos os tamanhos.",
        "Um cinto é um dos acessórios que combinam com essa peça.",
    ],
    "BONE": [
      "dicaBone1",
      "dicaBone2",
      "dicaBone3",
    ],
    "CACHECOL": [
        "dicaCachecol1",
        "dicaCachecol2",
        "dicaCachecol3",
    ],
    "RELOGIO": [
        "dicaRelogio1",
        "dicaRelogio2",
        "dicaRelogio3",
    ],
    "MEIA": [
        "dicaMeia1",
        "dicaMeia2",
        "dicaMeia3",
    ],
    "CARTEIRA": [
        "dicaCarteira1",
        "dicaCarteira2",
        "dicaCarteira3",
    ],
};

function sorteiaPalavra() {

    palavraChave = listaDePalavras[Math.floor(Math.random() * listaDePalavras.length)];
    // continuar daqui

}

function restartJogo() {

    wrongTries = [];
    rightTries = [];
    desconto = 50;
    numeroDesconto.innerHTML = '50%';

    for (const botoes of todosBotoesLetra){
        
        botoes.classList.remove(
            'button-letra-certa',
            'button-letra-errada'
        );

    }

    for (const dica of todasDicas){

        dica.classList.add('hide-dica');
        dica.classList.add('hide-dica');
        dica.classList.add('hide-dica');

    }
    
    // falta limpar o texto das dicas (ainda não sei como farei)

}

botaoSortear.addEventListener('click', function () {
    restartJogo();  
})
