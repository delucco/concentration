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
    var randomRow = Math.floor(Math.random()*4);
    var randomCol = Math.floor(Math.random()*13);
    if (!this.state.playerTurn && this.state.selections.length < 1){
      console.log('hi')
      Actions.selectCard(randomRow, randomCol);
    } else if (!this.state.playerTurn && this.state.selections.length === 1){
      console.log('hello')
      var rank = this.state.selections[0][2];
      revealedCards = this.state.revealedCards;
      setTimeout(function(){
        for (var key in revealedCards){
          if (rank === revealedCards[key].rank){
            randomRow = key.split(',')[0];
            randomCol = key.split(',')[1];
          } 
        }
        Actions.selectCard(randomRow, randomCol);
      }, 1000);
    }
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
