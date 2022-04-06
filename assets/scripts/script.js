const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card";
const ICON = "icon";
let count = 0;



startGame();

function startGame(){ //Cria as cartas e armazena dentro de cards.
    
  initializeCards(game.createCardsFromTechs());//pega os modelos e transforma algo em visual.
}

function initializeCards(){
  let gameBoard = document.getElementById("gameBoard");
  let mov = document.getElementById("mov");
      count = 0;

      mov.innerHTML = "Movimentos: 0"

  gameBoard.innerHTML = ''; // limpar o gameboard para poder rodar outro jogo novamente.
  game.cards.forEach(card => { //para cada uma das cartas vai ser criado um elemento

        let cardElement = document.createElement('div');
            cardElement.id = card.id;
            cardElement.classList.add(CARD); // add a classe card para o elemento
            cardElement.dataset.icon = card.icon;

            createCardContent(card, cardElement);

            cardElement.addEventListener('click', flipCard)
            gameBoard.appendChild(cardElement); // add o cardElement no gameBoard.
  })
}

function createCardContent(card, cardElement){
  createCardFace(FRONT, card, cardElement);
  createCardFace(BACK, card, cardElement);
}

function createCardFace(face, card, element){
  let cardElementFace = document.createElement('div');
      cardElementFace.classList.add(face)
  if(face == FRONT){
      let iconElement = document.createElement('img')
      iconElement.classList.add(ICON)
      iconElement.src = "./assets/images/" + card.icon + ".png"
      cardElementFace.appendChild(iconElement);
  } else{
    cardElementFace.innerHTML = "&lt/&gt"
  }

  element.appendChild(cardElementFace)
}

function flipCard(){

  if(game.setCard(this.id)){
      this.classList.add("flip");
      countCalculator()
      if(game.secondCard){
          if(game.checkMatch()){
            game.clearCards();
            if(game.checkGameOver()){
              let gameOverLayer = document.getElementById("gameOver");
              let result = document.getElementById("result")

                  gameOverLayer.style.display = 'flex';
                  result.innerHTML = "total movements= " + countCalculator()
            }
        }else{
          setTimeout(() => {
            let firstCardView = document.getElementById(game.firstCard.id);
            let secondCardView = document.getElementById(game.secondCard.id);
    
            firstCardView.classList.remove('flip');
            secondCardView.classList.remove('flip');
            game.unflipCards();
          }, 1000);
        }
      }
      
  }
}

function restart(){
  game.clearCards();
  startGame();
  let gameOverLayer = document.getElementById("gameOver");
  gameOverLayer.style.display = 'none';
}

function emojicon(){
  if(emoji2.style.display == "block"){

    emoji.style.display = "block";
    emoji2.style.display = "none";
    document.body.classList.remove("light");
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark")

  } else{

    emoji.style.display = "none";
    emoji2.style.display= "block";
    document.body.classList.remove("dark");
    document.body.classList.add("light");
    localStorage.setItem("theme", "light")
    
  }
}

function countCalculator() {
  let cardFlip = document.getElementById(this.classList)

  if (cardFlip != "flipCard") {
       count++;
  }
  
  document.getElementById("mov")
  mov.innerHTML = `Movimentos: ${count}`

  return count;
}
