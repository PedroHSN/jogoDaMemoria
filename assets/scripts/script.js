const FRONT = "card_front";
const BACK = "card_back"

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

function startGame(){
  cards = createCardsFromTechs(techs);
  shuffleCards(cards);
  console.log(cards);
}

function shuffleCards(cards){
  let currentIndex = cards.length;
  let randomIndex = 0;

  while(currentIndex !== 0){
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [cards[randomIndex], cards[currentIndex]] = [cards[currentIndex], cards[randomIndex]]
  }
}


createCardsFromTechs(techs);

function createCardsFromTechs(techs) { //para cada uma das techs, uma carta sera criada

  let cards = [];

  for(let tech of techs){ //pega cada tech das techs e para cada uma vai ser criado um par
    cards.push(createPairFromTech(tech));
  }

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