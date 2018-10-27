// Variaveis do jogo
let verificaCarta = 0;
let primeira, segunda;
let travarJogo = false;
let countMoves = 0;
let finish = 0;
let seconds = 0;
let timerId;
let clique = 0;

const playAgain = document.querySelector("#playAgain");
const modal = document.querySelector(".modal");
const modalTime = document.querySelector(".modal-time"); 
const moves = document.querySelector('.moves');
const cards = document.querySelectorAll('.card');
const parent = document.querySelector('.stars');
const stars1 = document.querySelector('.fa1');
const stars2 = document.querySelector('.fa2');
const stars3 = document.querySelector('.fa3');
const starsModal = document.querySelector(".stars-modal");
let timer = document.querySelector(".timer");


//Evento click para os cards
cards.forEach(card => card.addEventListener('click' , funcaoPrincipal));
playAgain.addEventListener("click", myFunction);

function myFunction() {
    location.reload();
}

// esta funcao e responsavel virar e tratar cartas
function funcaoPrincipal(){

    // evitar duplo clique no erro
    if(travarJogo) return;

    // evitar duplo clique no match
    for(i = 0; i <= this.classList.length; i++){
        if (this.classList[i] === 'match'){
            return;
        }
    }

    // evitar duplo clique no open
    for(i = 0; i <= this.classList.length; i++){
        if (this.classList[i] === 'open'){
            return;
        }
    }

    // substituir match atual com status open e show
    this.classList.toggle('open');
    this.classList.toggle('show');

    // define quem esta sendo clicado
    // verificaCarta = true  -> primeira carta
    // verificaCarta = false -> segunda carta
    if(verificaCarta == 0){
        verificaCarta += 1;
        primeira       = this;
        clique += 1;
    }else{
        verificaCarta += 1;
        segunda        = this;
        clique += 1;
    }

    // trata cartas quando 2 cartas abertas.
    trataCartas();
}

function trataCartas(){

    if (clique === 1) {
        timerId = setInterval( function(){
                        ++seconds;
                        timer.innerHTML=(parseInt(seconds/60,10) + ":" + seconds%60);
                    }, 1000);
    }
    
    if (verificaCarta === 2){
        if(primeira.dataset.framework != segunda.dataset.framework){
            cartasDiferentes();
            travarJogo = true;
            setTimeout(() => {
                desvirarCartas();
                travarJogo = false;
            }, 800);
            // contador de movimentos
            contarMovimentos();   
            // verificar score
            verificarEstrelas(); 
        }else{
            cartasIguais();
            // contador de movimentos
            contarMovimentos();
            // verificar score
            verificarEstrelas(); 
        }
        verificaCarta = 0;
    }
}

function contarMovimentos(){
    countMoves += 1;
    moves.textContent  = countMoves;

    if (finish === 8){
        modal.style.visibility = "visible";
        modalTime.innerHTML=(parseInt(seconds/60,10) + ":" + seconds%60);

        // stops the timer
        clearInterval(timerId);

        if (countMoves <= 8){
            const htmlTextToAdd1 = "<i class=\"fa3 fa fa-star\"></i>";
            starsModal.insertAdjacentHTML('afterend', htmlTextToAdd1);

            const htmlTextToAdd2 = "<i class=\"fa2 fa fa-star\"></i>";
            starsModal.insertAdjacentHTML('afterend', htmlTextToAdd2);

            const htmlTextToAdd3 = "<i class=\"fa1 fa fa-star\"></i>";
            starsModal.insertAdjacentHTML('afterend', htmlTextToAdd3);
        }
        if (countMoves > 8 && countMoves < 15){
            const htmlTextToAdd1 = "<i class=\"fa3 fa fa-star\"></i>";
            starsModal.insertAdjacentHTML('afterend', htmlTextToAdd1);
            
            const htmlTextToAdd2 = "<i class=\"fa2 fa fa-star\"></i>";
            starsModal.insertAdjacentHTML('afterend', htmlTextToAdd2);
        }
        
        if (countMoves >= 15){
            const htmlTextToAdd1 = "<i class=\"fa1 fa fa-star\"></i>";
            starsModal.insertAdjacentHTML('afterend', htmlTextToAdd1);
        }
    }
}

function verificarEstrelas(){
    if (countMoves === 9){
        const htmlTextToAdd = "<i class=\"fa3 fa fa-star-o\"></i>";
        stars3.insertAdjacentHTML('afterend', htmlTextToAdd);
        stars3.remove();
    }

    if (countMoves === 15){
        const htmlTextToAdd = "<i class=\"fa2 fa fa-star-o\"></i>";
        stars2.insertAdjacentHTML('afterend', htmlTextToAdd);
        stars2.remove();
    }
}

function cartasIguais(){
    primeira.classList.add('match');
    segunda.classList.add('match');
    finish += 1;
}

function cartasDiferentes(){
    primeira.classList.add('error');
    segunda.classList.add('error');
}

function desvirarCartas(){
    primeira.classList.remove('error');                
    segunda.classList.remove('error');                
    primeira.classList.remove('show');                
    segunda.classList.remove('show');
    primeira.classList.remove('open');                
    segunda.classList.remove('open');
}

(function timerOnload(){
        timer.innerHTML=("0:0");
        clearInterval(timerId);
})();

(function suffle(){
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16);
       card.style.order = randomPos;
    })
})();