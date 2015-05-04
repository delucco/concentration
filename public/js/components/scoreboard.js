var cx = require('react/lib/cx');

var Scoreboard = React.createClass({

  render: function(){
    return (
      <div className='scoreboard'> 
        <div className={cx({'turn': this.props.turn})}>User score: {this.props.score.user}</div>
        <div className={cx({'turn': !this.props.turn})}>Computer score: {this.props.score.computer}</div>
      </div>
    );
  }

});

module.exports = Scoreboard;