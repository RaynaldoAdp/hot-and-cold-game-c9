var React = require('react');
var connect = require('react-redux').connect;

var ConditionStatus = require('./condition-status');
var actions = require('../actions/index');

var LeaderBoard = function(props){
	var leastGuesses = props.bestRecord;
	return <h1>Least Number of guesses is: {leastGuesses}</h1>; //to append strings in divs/texts
};

var Game = React.createClass({
	componentDidMount: function() {
		this.props.dispatch(actions.generateRandomNumber());		
		this.props.dispatch(
            actions.fetchDescription()
        );
	},
	guessNumber: function(){
		var guessedNumber = this.refs.inputNumber.value;
		this.props.dispatch(actions.guessNumber(guessedNumber));
	},
	render: function(){
		//have to use the map function to pass on the data to the props. and dont forget the key.
		var gameCondition = this.props.gameCondition.map(function(state, index) {
            return <ConditionStatus condition={state} key={index} />; 
        });
        
        var leastGuesses = this.props.gameCondition.map(function(state, index) {
        	return <LeaderBoard bestRecord={state.bestRecord} key={index} />	
        });

		return(
			<div className="gameContainer">
				<div>
					{leastGuesses}
				</div>
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