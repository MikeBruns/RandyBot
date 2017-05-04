const vars    = require('./vars');
const request = require("request");


var get_trivia_q = function(message) {
	request("https://opentdb.com/api.php?amount=1", (error, response, body) =>{
		var json = JSON.parse(body);
		if("error" in json){
			message.reply("Send Help! " + json.error.errors[0] + " - " + json.error.errors[0].reason);
		}else{
			message.reply(json.results[0].question);
				   // .then(msg => console.log(`:: Asked a trivia question ::\n` + json.question + `\n`))
 				  //  .catch(console.error);

			console.log(`Answer to trivia question: ` + json.results[0].correct_answer);
		}
	});
}

module.exports.get_trivia_q = get_trivia_q;