var AppDispatcher = require('../dispatchers/appDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _state = {
  score: {
    computer: 0,
    user: 0
  },
  playerTurn: true,
  cardTable: [],
  selections: [],
  revealedCards: {},
  pairCreated: false
};

var confirmPair = function(){
  _state.pairCreated = true;
}

var startNewTurn = function(){
  _state.pairCreated = false;
}

var dealCards = function(cards){
  _state.cardTable = cards;
}

var removeMatches = function(){
  _state.selections.forEach(function(index){
    _state.cardTable[index[0]][index[1]].removed = true;
  });
  _state.selections = [];
}

var removeSelections = function(){
  _state.selections.forEach(function(index){
    _state.cardTable[index[0]][index[1]].selected = false;
  });
  _state.selections = [];
}

var switchPlayer = function(){
  _state.playerTurn = !_state.playerTurn;
}

var updateScore = function(){
  _state.playerTurn ? _state.score.user++ : _state.score.computer++;
}

var updateSelections = function(row, col){
  var index = [row, col];
  var rank = _state.cardTable[row][col].rank
  _state.cardTable[row][col].selected = true;
  _state.revealedCards[index] = _state.cardTable[row][col];
  index.push(rank);
  _state.selections.push(index);
}

var AppStore = assign({}, EventEmitter.prototype, {

  getState: function(){
    return _state;
  },

  emitChange: function(){
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback){
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListerner: function(callback){
    this.removeListener(CHANGE_EVENT, callback);
  }

});

AppDispatcher.register(function(action){
  var action = action.action;

  switch(action.actionType){

    case 'DEALT_CARDS':
      dealCards(action.cards);
      AppStore.emitChange();
      break;

    case 'SELECTED_CARD':
      updateSelections(action.index[0], action.index[1]);
      AppStore.emitChange();
      break;

    case 'SELECTED_SECOND_CARD':
      confirmPair();
      AppStore.emitChange();
      break;

    case 'SELECTED_CORRECTLY':
      updateScore();
      removeMatches();
      removeSelections();
      startNewTurn();
      AppStore.emitChange();
      break;
      
    case 'SELECTED_INCORRECTLY':
      removeSelections();
      switchPlayer();
      startNewTurn();
      AppStore.emitChange();
      break;  

  }
});

module.exports = AppStore;