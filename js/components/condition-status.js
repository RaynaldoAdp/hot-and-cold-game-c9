var React = require('react');

var PostButton = function(props){
	var numberOfGuesses = props.status;
	if(numberOfGuesses != null){
		return <button onClick={props.onClick} className="postButton">POST!</button>;
	}
	else{
		return <empty />
	}
};

var ConditionStatus = React.createClass({
	onClick: function(){
		console.log(this.props.condition.numberOfGuesses);
	},
	render: function() {
		//passed on later with mapstate function. this.props.condition get the state from game.js
		//the state needs another.condition to get the condition status
		var condition = this.props.condition.condition; 
		var message;
		if(condition === "games done"){
			message = "Congratulations thats the correct number!";
			//dispatch action here?
		}
		else if(condition === "very hot"){
			message = "Very Hot";
		}
		else if(condition === "cold"){
			message = "Cold";
		}

		return(
			<div>
				<h1>{message}</h1>
				<PostButton status={this.props.condition.numberOfGuesses} onClick={this.onClick}/>
			</div>
		);
	}
});

module.exports = ConditionStatus;