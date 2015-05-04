var AppDispatcher = require('../dispatchers/appDispatcher');

var cardMatrix = [];

var selections = [];

var Actions = {

  dealCards: function(){
    var suits = ['hearts', 'spades', 'diamonds', 'clubs'];
    var ranks = ['ace', 'king', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen'];
    var deck = [];
    var shuffleDeck = function(deck) {
      var swap = function (a,b) {
        var temp = deck[a];
        deck[a] = deck[b];
        deck[b] = temp;
      }
      for (var i = 0; i < deck.length; i++) {
        var pick = i + Math.floor(Math.random() * (deck.length - i));
        swap(i, pick);
      }
      return deck;
    };
    for (var i=0; i<52; i++){
      var card = {};
      card.suit = suits[Math.floor(i/13)];
      card.rank = ranks[Math.floor(i%13)];
      card.selected = false;
      card.removed = false;
      deck.push(card);
    }
    shuffleDeck(deck);
    for (var j=0; j<52; j++){
      var row = Math.floor(j/13);
      if (!cardMatrix[row]){
        cardMatrix[row] = [];
      }
      cardMatrix[row].push(deck[j]);
    }
    AppDispatcher.handleViewAction({
      actionType: 'DEALT_CARDS',
      cards: cardMatrix
    });
  },

  selectCard: function(row, col){
    var selectedCard = cardMatrix[row][col];
    selections.push(selectedCard);
    AppDispatcher.handleViewAction({
      actionType: 'SELECTED_CARD',
      index: [row, col]
    });
    if (selections.length === 2){
      AppDispatcher.handleViewAction({
        actionType: 'SELECTED_SECOND_CARD'
      });
      if (selections[0].rank === selections[1].rank){
        selections = [];
        setTimeout(function(){
          AppDispatcher.handleViewAction({
            actionType: 'SELECTED_CORRECTLY'
          });
        }, 1000);
      } else {
        selections = [];
        setTimeout(function(){
          AppDispatcher.handleViewAction({
            actionType: 'SELECTED_INCORRECTLY'
          });
        }, 1000);
      }
    }
  }

}

module.exports = Actions;