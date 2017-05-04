const { Command }  = require('discord.js-commando');
const vars         = require('../../vars');
const trivia_funcs = require('../../trivia_functions');
const misc_funcs   = require('../../misc_functions');


class Trivia extends Command{
	constructor(client){
		super(client, {
			name: 'trivia',
			group: 'random',
			memberName: 'trivia',
			description: 'Random trivia question',
			examples: ['/trivia']
		})
	}

	async run(message, args){
		if(misc_funcs.isIgnored(message.author)) 
			return;
		
		try{
			// var q = "";
			// for(var i = 1; i < args.length; i++){
			// 	q += args[i] + " ";
			// }
			trivia_funcs.get_trivia_q(message);
		}catch(ex){
			console.log(ex.stack);
		}
	}
}

module.exports = Trivia;