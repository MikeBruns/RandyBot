const vars    = require('./vars');
const request = require("request");


var get_trivia_q = function(message) {
	request("https://opentdb.com/api.php?amount=1", (error, response, body) =>{
		var json = JSON.parse(body);
		if("error" in json){
			message.reply("Send Help! " + json.error.errors[0] + " - " + json.error.errors[0].reason);
		}else{
			message.reply(json.results[0].question);
			console.log(`:: Asked a trivia question ::\n` + json.question + `\n`);

 			if(json.results[0].type === "multiple"){
 				var answers = [];
 				answers.push(json.results[0].correct_answer);
 				for(var i = 0; i < json.results[0].incorrect_answers.length; i++) {
 					answers.push(json.results[0].incorrect_answers[i]);
 				}
 				randomize_array(answers);
 			}

 			for(var i = 0; i < answers.length; i++){
 				message.reply(answers[i]);
 			}

			console.log(`:: Answer to trivia question :: \n` + json.results[0].correct_answer);
		}
	});
}

//Randomize the freaking array of answers so
//puds can't guess the right answer each time
var radomize_array = function(array){
	var currentIndex = array.length, temp, randomIndex;

	while(0 !== currentIndex){
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		temp = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temp;
	}

	return array;
}

module.exports.get_trivia_q = get_trivia_q;