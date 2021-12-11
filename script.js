//const Swal = required('sweetalert2')
let order = [];
let clickedOrder = [];
let score = 0;

//0 - verde
//1 - vermelho
//2 - amarelo
//3 - azul

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');
const resultado = document.getElementById('resultado')

//cria ordem aletoria de cores
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

//acende a proxima cor
let lightColor = (element, number) => {
    number = number * 500;
    setTimeout(() => {
        element.classList.add('ativo');
    }, number - 250);

    setTimeout(() => {
        element.classList.remove('ativo');
    },number - 100);
}

//checa se os botoes clicados são os mesmos da ordem gerada no jogo
let checkOrder = async () => {
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }
    if(clickedOrder.length == order.length) {
      await  Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: `Iniciando próximo nível...`,
            showConfirmButton: false,
            timer: 1000
          })
        nextLevel();
    }
}

//funcao para o clique do usuario
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('ativo');

    setTimeout(() => {
        createColorElement(color).classList.remove('ativo');
        checkOrder();
    },250);
}

//funcao que retorna a cor
let createColorElement = (color) => {
    if(color == 0) {
        return green;
    } else if(color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else if (color == 3) {
        return blue;
    }
}

//funcao para proximo nivel do jogo
let nextLevel = () => {
    resultado.innerHTML = 'Score: '+ score;
    score++;
    shuffleOrder();
}

//funcao para game over
let gameOver = async () => {
   await Swal.fire({
        position: 'top-center',
        icon: 'error',
        title: 'Voce Perdeu',
        showConfirmButton: false,
        timer: 3000
      })
    //alert(`Pontuação: ${score}!\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo`);
    order = [];
    clickedOrder = [];

    playGame();
}

//funcao de inicio do jogo
let playGame = async () => {
    await Swal.fire({
        title: 'Bem vindo ao Gênesis!',
        icon: 'question',
        confirmButtonText: 'Jogar',
        showConfirmButton: true,
      })

    score = 0;

    nextLevel();
}

//eventos de clique para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);


//inicio do jogo
playGame();