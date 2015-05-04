var Card = require('./card');

var CardRow = React.createClass({

  render: function(){
    var row = this.props.row;
    var rowNum = this.props.rowNum;
    var cards = row.map(function(card, column){
      return (
        <Card card={card} rowNum={rowNum} col={column} />
      )
    })
    return (
      <div className='cardRow'> 
        {cards}
      </div>
    );
  }

});

module.exports = CardRow;