let game = {

  lockMode: false,
  firstCard: null,
  secondCard: null,

  setCard: function(id){
       
    let card =  this.cards.filter(card => card.id === id)[0];
    
    if(card.flipped || this.lockMode) {
      return false;
    }

      if(!this.firstCard){
          this.firstCard = card;
          this.firstCard.flipped = true;
          return true;
        }else {
          this.secondCard = card;
          this.secondCard.flipped = true;
          this.lockMode = true;
          return true;
      }
  },

  checkMatch: function(){
    if(!this.firstCard || !this.secondCard){
      return false;
    }
      return this.firstCard.icon === this.secondCard.icon;
  },

  clearCards: function(){
    this.firstCard = null;
    this.secondCard = null;
    this.lockMode = false;
  },

  unflipCards: function (){
    this.firstCard.flipped = false;
    this.secondCard.flipped = false;
    this.clearCards();
  },

  techs :['bootstrap', //os tipos de cartas
      'css',
      'electron',
      'html',
      'firebase',
      'javascript',
      'jquery',
      'mongo',
      'node',
      'react'],

  cards: null,

  createCardsFromTechs: function() { //para cada uma das techs, uma carta sera criada

    this.cards = [];
  
    this.techs.forEach((tech) => { //pega cada tech das techs e para cada uma vai ser criado um par. Loop em um array. Ou for of.
      this.cards.push(this.createPairFromTech(tech));
    }) 
   this.cards = this.cards.flatMap(pair => pair); //retorna um array, flatMap separa os itens de um array e retorna para apenas um unico array.
   this.shuffleCards();
   return this.cards;
   
  }
   ,
  createPairFromTech: function (tech){ // cria array com as cartas
  
      return [{
          id: this.createIdWidthTech(tech),
          icon: tech,
          flipped: false,
      }, {
          id: this.createIdWidthTech(tech),
          icon: tech,
          flipped: false,
      }]
  },
  
  createIdWidthTech: function (tech){ //gera um id para as cartas
    return tech + parseInt(Math.random() * 1000); //parseInt para gerar numero inteiro
  },

  shuffleCards: function (cards){ //função para embaralhar.
    let currentIndex = this.cards.length; //pega o ultimo index.
    let randomIndex = 0;
  
    while(currentIndex !== 0){
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]] //inversão de valores
    }
  }
}

