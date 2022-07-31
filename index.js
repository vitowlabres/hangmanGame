// ====================== VARIÁVEIS E CONSTANTES INICIAIS ======================

const popup = document.querySelector('.popup');
const msgPopup = document.querySelector('.msg-popup');
const botaoFechar = document.querySelector('.fechar');
const botaoOkPopup = document.querySelector('.ok-popup');
const numeroDesconto = document.querySelector('.valor-desconto')
const botaoInfo = document.querySelector('.button-informacao');
const instrucoes = document.querySelector('.container-instrucoes');
const botaoSortear = document.querySelector('.button-sortear');
const botaoLetra = document.querySelector('.button-letra');
const todosBotoesLetra = document.querySelectorAll('.button-letra');
const botaoDica = document.querySelector('.button-dica');
const todasDicas = document.querySelectorAll('.div-dicas')
const espacoPalavra = document.querySelector(".espaco-palavra");
const listaDicas = document.querySelectorAll('.texto-dicas');

var desconto = 50;
var palavraChave = "";
var ganhou = false;
var charArray = []
var listaDePalavras = ['CAMISETA', 'CALÇA', 'BONE', 'CACHECOL', 'RELOGIO', 'MEIA', 'CARTEIRA'];
let dicas = {
    "CAMISETA": [
      "É perfeita para dias quentes.",
      "Pode ser 100% algodão.",
      "É possível colocar uma estampa nela ou bordar."
    ],
    "CALÇA": [
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
    
    espacoPalavra.innerText = "";
    
    let displaySpan = palavraChave.replace(/./g, '<span class="dashes">_</span>');
    
    espacoPalavra.innerHTML = displaySpan;

    // EXCLUIR ESSA PARTE DEPOIS
    console.log(palavraChave)
}

// função responsável por atualizar o valor do desconto de acordo com o parâmetro "valorDesconto"
function reduzDesconto(valorDesconto) {
    // verificar se o valor do desconto após a redução é maior ou igual a zero
    if ((desconto - valorDesconto) >= 0) {
        // atualiza o valor do desconto
        desconto = desconto - valorDesconto;
        // armazena o novo valor do desconto no espaço a ele no html
        numeroDesconto.innerHTML = `<p class="valor-desconto">${desconto}</p>`;
    };

    // se, após aplicar a redução, o desconto for igual a zero, o usuário perdeu o jogo
    if (desconto == 0) {
        alertaPopup('Você perdeu :/!')
    };
};

function restartJogo() {

    desconto = 50;
    numeroDesconto.innerHTML = '50';

    for (const botoes of todosBotoesLetra){
        
        botoes.classList.remove(
            'button-letra-certa',
            'button-letra-errada'
        );
        botoes.disabled = false;

    }
    
    // limpa os campos das dicas
    listaDicas.forEach(function (elemento, index) {
        elemento.innerHTML = '';
    });

    sorteiaPalavra()
}

// evento disparado ao clicar no botão "ok" do popup. Como resultado, o pop desaparece da tela
botaoOkPopup.addEventListener('click', function () {
    popup.classList.add('hide-popup')
});

// evento disparado ao clicar no botão "x" do popup. Como resultado, o pop desaparece da tela
botaoFechar.addEventListener('click', function () {
    popup.classList.add('hide-popup')
});

botaoSortear.addEventListener('click', function () {
    ganhou = false;
    restartJogo();  
})

// evento disparado ao clicar em algum botão do teclado
for (const letra of todosBotoesLetra){ 
    letra.addEventListener('click', function (e) {
        console.log(e)
        // verificar se palavra já foi escolhida
        if (palavraChave != '') {
            // verifica se o jogo já acabou
            if (ganhou == false) {
                // verifica se não há mais desconto a ganhar
                if (desconto == 0) {
                    alertaPopup('Você perdeu :/!')
                
                // verifica se o elemento selecionado foi uma letra
                } else if (e.target.innerText != 'Solicitar Dica' && e.target.innerText.length == 1) {
                    // armazena a qtd de letras da palavra sorteada
                    const listaLetras = document.querySelectorAll('.dashes');
                    // desabilita o teclado selecionado
                    e.target.disabled = true;
                    letraCerta = false;
                    // armazena as letras da palavra em um vetor
                    charArray = palavraChave.split("");
                    // percorre todas as letras da palavra sorteada
                    charArray.forEach(function (elemento, index) {
                        // verifica se alguma letra da palavra sorteada condiz com a letras selecionada
                        if (e.target.innerText == elemento.toUpperCase()) {
                            // preenche a palavra sorteada com a letra selecionada
                            listaLetras[index].innerHTML = e.target.innerText;
                            letraCerta = true
                        };
                    });
                    
                    // verifica se a letra selecionada está correta
                    if (letraCerta == false) {
                        e.target.classList.add('button-letra-errada');
                        reduzDesconto(10);
                    } else {
                        e.target.classList.add('button-letra-certa');
                    };
    
                    ganhou = true;
                    
                    // iteração para verificar se a palavra já foi descoberta. Se um dos espaços destinado às letras da palavra contiver o caractere "_", significa que o jogo ainda não acabou
                    listaLetras.forEach(function (e) {
                        if (e.innerText == "_") {
                            ganhou = false;
                        }
                    });
                
                    if (ganhou == true) {
                        alertaPopup('Vc ganhou ' + desconto + '% de desconto! Parabéns! Sorteie outra palavra para jogar novamente!');
                    };
                };
            } else {
                alertaPopup('Vc ganhou ' + desconto + '% de desconto! Parabéns! Sorteie outra palavra para jogar novamente!');
            };
        } else {
            alertaPopup('Sorteie uma palavra para jogar!')
        };
    });
}

// evento disparado ao clicar no botão "Quero uma dica". Como resultado, a dica referente à palavra escolhida aparece no 1o campo vazio da área de dicas
botaoDica.addEventListener('click', function () {
    // verificar se palavra já foi escolhida
    if (palavraChave != '') {
        // verifica se o jogo já acabou
        if (ganhou == false) {
            // verifica se não há mais desconto a ganhar
            if (desconto == 0) {
                alertaPopup('Você perdeu :/!')
            } else {
                // variável de apoio para que não sejam preenchidas todas as dicas de uma vez só
                var dicaOk = false;
                
                // percorre os campos destinados às dicas. A dica é inserida caso esteja vazia
                listaDicas.forEach(function (elemento, index) {
                    if (elemento.innerHTML == '' && dicaOk == false) {
                        // atribui ao campo vazio a respectiva dica
                        elemento.innerHTML = `${dicas[palavraChave][index]}`;
                        // chama a função para reduzir o valor do desconto
                        reduzDesconto(10);
                        dicaOk = true;
                    }
                });
                // condição responsável por verificar se o usuário já excedeu o nro de dicas
                if (dicaOk == false) {
                    alertaPopup('Você já excedeu o nro de dicas!')
                }
            }
        } else {
            alertaPopup('Você ganhou ' + desconto + '% de desconto! Parabéns! Sorteie outra palavra para jogar novamente!');
        }

    } else {
        alertaPopup('Sorteie uma palavra para jogar!')
    }
    
});

//função responsável por mostrar o popup na tela
function alertaPopup(msg) {
    popup.classList.remove('hide-popup')
    msgPopup.innerHTML = `<p class="texto-popup"> ${msg}</p>`;
};


// função responsável por mostrar as instruções ao passar o mouse ('mouseenter') no botão de "dúvida"
function hover(elemento, enter, leave) {
    elemento.addEventListener('mouseenter', enter)
    elemento.addEventListener('mouseleave', leave)
};

// evento disparado ao passar o mouse por cima do botão de instruções. Como resultado, mostra a lista de instruções e coloca o fundo vermelho do botão "instrucoes" 
hover(botaoInfo, function () {
    instrucoes.classList.add('class-hover');
    botaoInfo.classList.add('fundo-vermelho');
}, function () {
    instrucoes.classList.remove('class-hover');
    botaoInfo.classList.remove('fundo-vermelho');
});