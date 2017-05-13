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
			examples: ['/trivia', '/trivia sports', '/trivia computers', '/trivia film']
		})
	}

	async run(message, args){
		if(misc_funcs.isIgnored(message.author)) 
			return;
		
		try{
			var id = null;
			var q  = '';

			for(var i = 0; i < args.length; i++){
				q += args[i];
			}

			if(q === 'sports'){
				id = 21;
			} else if(q === 'computers'){
				id = 18;
			} else if(q === 'film'){
				id = 11;
			} else {
				id = null;
			}

			if (q !== null && id === null){
				message.reply("Sir, use the right argument");
			} else{
				trivia_funcs.get_trivia_q(message, id);	
			}
			
			
		}catch(ex){
			console.log(ex.stack);
		}
	}
}

module.exports = Trivia;