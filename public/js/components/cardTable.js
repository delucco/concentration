var CardRow = require('./cardRow');

var CardTable = React.createClass({

  render: function(){
    var table = this.props.cardTable;
    var rows = table.map(function(row, num){
      return (
        <CardRow row={row} rowNum={num} />
      )
    })
    return (
      <div>
        <div className='cardTable'> 
          {rows}
        </div>
      </div>
    );
  }

});

module.exports = CardTable;
