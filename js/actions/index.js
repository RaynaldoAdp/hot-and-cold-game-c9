//List of actions:
//Guess a number
//Generate a random number
//Start a new game
//When what? button is clicked(info panel for the game)

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

exports.GENERATE_RANDOM_NUMBER = GENERATE_RANDOM_NUMBER;
exports.generateRandomNumber = generateRandomNumber;
exports.GUESS_NUMBER = GUESS_NUMBER;
exports.guessNumber = guessNumber;
exports.START_NEW_GAME = START_NEW_GAME;
exports.startNewGame = startNewGame;
exports.GAME_INFO = GAME_INFO;
exports.gameInfo = gameInfo;