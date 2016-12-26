//List of actions:
//Guess a number
//Generate a random number
//Start a new game
//When what? button is clicked(info panel for the game)

require('isomorphic-fetch');

var GUESS_NUMBER = 'GUESS_NUMBER';
var guessNumber = function(number){
	return{
		type: GUESS_NUMBER,
		number: number
	}
}

var GENERATE_RANDOM_NUMBER ='GENERATE_RANDOM_NUMBER';
var generateRandomNumber = function(){
	return{
		type: GENERATE_RANDOM_NUMBER,
	//	answer: answer //can I put a var math.random on this actions directory and pass the number in as props to generateRandomNumber?
	}
}

var START_NEW_GAME = 'START_NEW_GAME';
var startNewGame = function(){
	return{

	}
}

var GAME_INFO = 'GAME_INFO';
var gameInfo = function(){
	return{
		
	}
}

var FETCH_DESCRIPTION_SUCCESS = 'FETCH_DESCRIPTION_SUCCESS';
var fetchDescriptionSuccess = function(number) {
    return {
        type: FETCH_DESCRIPTION_SUCCESS,
        lowestAmountOfGuess: number
    };
};

var FETCH_DESCRIPTION_ERROR= 'FETCH_DESCRIPTION_ERROR';
var fetchDescriptionError = function() {
    return {
        type: FETCH_DESCRIPTION_ERROR
    };
};
var fetchDescription = function() {
    return function(dispatch) {
        var url = 'https://hot-and-cold-game-raynaldoadp.c9users.io/items';
        return fetch(url).then(function(response) {
            if (response.status < 200 || response.status >= 300) {
                var error = new Error(response.statusText)
                error.response = response
                throw error;
            }
            return response;
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            var lowestAmountOfGuess = data.number;
            return dispatch(
                fetchDescriptionSuccess(lowestAmountOfGuess)
            );
        })
        .catch(function(error) {
            return dispatch(
                fetchDescriptionError()
            );
        });
    }
};

//To post using isomorphic-fetch

/*var postDescription = function() {
	return function(dispatch) {
		var url = 'https://hot-and-cold-game-raynaldoadp.c9users.io/items';
		return fetch(url,{
	      method: 'POST',
	      headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json'
	      },
	      body: JSON.stringify({
	      	number: 1000
	      })
	    })
        .then(function(response) {
            return response.json();
            console.log('posted!');
        })
    }
};
*/
exports.GENERATE_RANDOM_NUMBER = GENERATE_RANDOM_NUMBER;
exports.generateRandomNumber = generateRandomNumber;
exports.GUESS_NUMBER = GUESS_NUMBER;
exports.guessNumber = guessNumber;
exports.START_NEW_GAME = START_NEW_GAME;
exports.startNewGame = startNewGame;
exports.GAME_INFO = GAME_INFO;
exports.gameInfo = gameInfo;
exports.FETCH_DESCRIPTION_SUCCESS = FETCH_DESCRIPTION_SUCCESS;
exports.fetchDescriptionSuccess = fetchDescriptionSuccess;
exports.FETCH_DESCRIPTION_ERROR = FETCH_DESCRIPTION_ERROR;
exports.fetchDescriptionError = fetchDescriptionError;
exports.fetchDescription = fetchDescription;
/*exports.postDescription = postDescription;*/