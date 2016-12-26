var actions = require('../actions/index');

var initialGameState = [];

var numberOfGuesses = 0;

var ajaxPost = function(number) {
    var item = {'number': number};
    var ajax = $.ajax('https://hot-and-cold-game-raynaldoadp.c9users.io/items', {
        type: 'POST',
        data: JSON.stringify(item),
        dataType: 'json',
        contentType: 'application/json'
    });
    ajax.done(console.log('POSTED!' + number));
};

var gameReducer = function(state, action){
	state = state || initialGameState;
	if(action.type === actions.GENERATE_RANDOM_NUMBER) {
		var answer = Math.floor((Math.random() * 100) + 1);
		console.log(answer);
		return state.concat({
			answer: answer,
			condition: null,
			numberOfGuesses: null
		});
	}
	else if(action.type === actions.GUESS_NUMBER){
		var numberToAssess = action.number;
		var condition;
		var numberOfGuessesToBePassed;
		numberOfGuesses++;
		console.log(numberOfGuesses);
		console.log(state);
		if((numberToAssess) == state[0].answer){
			condition = "games done";
			numberOfGuessesToBePassed = numberOfGuesses;
			ajaxPost(numberOfGuessesToBePassed);
		}
		else if(numberToAssess < state[0].answer + 10 && numberToAssess > state[0].answer - 10){
			condition = "very hot";
			numberOfGuessesToBePassed = null;
		}
		else{
			condition = "cold";
			numberOfGuessesToBePassed = null;
		}
		console.log(condition); //can console.log in reducers to check
		var newState = Object.assign({}, {answer: state[0].answer, condition: condition, numberOfGuesses: numberOfGuessesToBePassed, bestRecord: state[0].bestRecord});
	    console.log(newState); //can console.log in reducers to check state
		return [newState]; //the new state after action dispatched and reduced
	}
	else if(action.type === actions.FETCH_DESCRIPTION_SUCCESS){
		var numberDisplayed = action.lowestAmountOfGuess;
		var newState = Object.assign({}, {answer: state[0].answer, condition: condition, numberOfGuesses: numberOfGuessesToBePassed, bestRecord: numberDisplayed} );
		return [newState];
	}
	else if(action.type === actions.FETCH_DESCRIPTION_ERROR){
		console.log('error');
		var newState = Object.assign({}, {answer: state[0].answer, condition: condition, numberOfGuesses: numberOfGuessesToBePassed, bestRecord: null} );
		return [newState];
	}
	return state; // finally returning the new state through the dispatch of the action
};

exports.gameReducer = gameReducer;