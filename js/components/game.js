var React = require('react');
var connect = require('react-redux').connect;

var ConditionStatus = require('./condition-status');
var actions = require('../actions/index');

var Game = React.createClass({
	componentDidMount: function() {
		this.props.dispatch(actions.generateRandomNumber());
	},
	guessNumber: function(){
		var guessedNumber = this.refs.inputNumber.value;
		this.props.dispatch(actions.guessNumber(guessedNumber));
	},
	render: function(){
		//have to use the map function to pass on the data to the props. and dont forget the key.
		var gameCondition = this.props.gameCondition.map(function(game, index) {
            return <ConditionStatus condition={game} key={index} />; 
        });

		return(
			<div className="gameContainer">
				<input type="text" ref="inputNumber"/>
	            <button type="button" onClick={this.guessNumber}>
	                Make a Guess!
	            </button>
	            <div>
	            	{gameCondition}
	            </div>
			</div>
		);
	}
});

var mapStateToProps = function(state, props) {
	return{
		gameCondition : state
	};
}

var Container = connect(mapStateToProps)(Game);

module.exports = Container;