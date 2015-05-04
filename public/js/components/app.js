var Scoreboard = require('./scoreboard');
var CardTable = require('./cardTable');
var AppStore = require('../stores/appStore');
var Actions = require('../actions/actions');

var App = React.createClass({

  getInitialState: function() {
    return AppStore.getState();
  },

  componentDidMount: function() {
    AppStore.addChangeListener(this._onChange);
    Actions.dealCards();
  },

  componentDidUpdate: function() {
    if (this.state.score.user >= 13 || this.state.score.computer >= 13){
      alert('game over');
    }
    var playerTurn = this.state.playerTurn;
    var revealedCards = this.state.revealedCards;
    var selections = this.state.selections;
    var pairCreated = this.state.pairCreated;
    var cardTable = this.state.cardTable;
    var generateRandomIndex = function(){
      var randomRow = Math.floor(Math.random()*4);
      var randomCol = Math.floor(Math.random()*13);
      if (cardTable[randomRow][randomCol].removed){
        generateRandomIndex();
      }
      return [randomRow, randomCol];
    }
    setTimeout(function(){
      if (!playerTurn && selections.length < 1 && !pairCreated){
        var index = generateRandomIndex();
        Actions.selectCard(index[0], index[1]);
      } else if (!playerTurn && selections.length === 1 && !pairCreated){
        var index = generateRandomIndex();
        // for (var key in revealedCards){
        //   console.dir(selections)
        //   var keyRow = key.split(',')[0];
        //   var keyCol = key.split(',')[1]; 
        //   if (selections[0][0] !== keyRow && selections[0][1] !== keyCol){
        //     if (selections[0][2] === revealedCards[key].rank){
        //       console.log('row selcetion rd 1 ' + selections[0][0])
        //       console.log('col selcetion rd 1 ' + selections[0][1])
        //       index[0] = keyRow;
        //       index[1] = keyCol;
        //       console.log('row selcetion rd 2 ' + index[0])
        //       console.log('col selcetion rd 2 ' + index[1])
        //     } 
        //   }
        // }
        Actions.selectCard(index[0], index[1]);
      }
    }, 1000);
  },

  render: function() {
    return (
      <div className='app'> 
        <h1>CONCENTRATION</h1>
        <Scoreboard score={this.state.score} turn={this.state.playerTurn} />
        <CardTable cardTable={this.state.cardTable} />
      </div>
    );
  },

  _onChange: function() {
    this.setState(AppStore.getState());
  }

});

module.exports = App;
