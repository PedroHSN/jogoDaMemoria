const FRONT = "card_front";
const BACK = "card_back"
const CARD = "card"
const ICON = "icon"

let techs = ['bootstrap', //os tipos de cartas
'css',
'electron',
'html',
'firebase',
'javascript',
'jquery',
'mongo',
'node',
'react'];

let cards = null;

startGame();

function startGame(){ //Cria as cartas e armazena dentro de cards.
  cards = createCardsFromTechs(techs);
  shuffleCards(cards);
  
  initializeCards(cards);//pega os modelos e transforma algo em visual.
}

function initializeCards(cards){
  let gameBoard = document.getElementById("gameBoard") 

  cards.forEach(card => { //para cada uma das cartas vai ser criado um elemento

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

function shuffleCards(cards){ //função para embaralhar.
  let currentIndex = cards.length; //pega o ultimo index.
  let randomIndex = 0;

  while(currentIndex !== 0){
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [cards[randomIndex], cards[currentIndex]] = [cards[currentIndex], cards[randomIndex]] //inversão de valores
  }
}


createCardsFromTechs(techs);

function createCardsFromTechs(techs) { //para cada uma das techs, uma carta sera criada

  let cards = [];

  techs.forEach((tech) => { //pega cada tech das techs e para cada uma vai ser criado um par. Loop em um array. Ou for of.
    cards.push(createPairFromTech(tech));
  }) 
  return cards.flatMap(pair => pair); //retorna um array, flatMap separa os itens de um array e retorna para apenas um unico array.
}
 
function createPairFromTech(tech){ // cria array com as cartas

    return [{
        id: createIdWidthTech(tech),
        icon: tech,
        flipped: false,
    }, {
        id: createIdWidthTech(tech),
        icon: tech,
        flipped: false,
    }]
}

function createIdWidthTech(tech){ //gera um id para as cartas
  return tech + parseInt(Math.random() * 1000); //parseInt para gerar numero inteiro
}

function flipCard(){
  this.classList.add("flip");
}