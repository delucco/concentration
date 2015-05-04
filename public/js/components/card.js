var Actions = require('../actions/actions');

var Card = React.createClass({

  select: function(){
    Actions.selectCard(this.props.rowNum, this.props.col);
  },

  render: function(){
    var suit = this.props.card.suit;
    var rank = this.props.card.rank;
    var source = '../../images/cards/' + rank + '-' + suit + '.png';
    if (this.props.card.removed){
      return (
        <img className='card' src='../../images/blank-card.png'></img>
      )
    } else if (this.props.card.selected){
      return (
        <img className='card' src={source}></img>
      );
    } else {
      return (
        <img className='card' src='../../images/card-back.png' onClick={this.select}></img>
      );
    }
  }

});

module.exports = Card;
