const { Command } = require('discord.js-commando');
const vars = require('../../vars');
const mus_funcs = require('../../music_functions');
const misc_funcs = require('../../misc_functions');


class Queue extends Command{
	constructor(client){
		super(client, {
			name: 'queue',
			group: 'music',
			memberName: 'queue',
			description: 'Show the Queue',
			examples: ['/queue']
		})
	}

	async run(message, args){
		if(misc_funcs.isIgnored) return;

		var response = "";

		try{

			if(mus_funcs.is_queue_empty()){
				response = "Nothing in the queue atm.";
			}else{
				var long_queue = vars.queue.length > 30;
				for(var i = 0; i < (long_queue ? 30 : vars.queue.length); i++){
					response +=  "\"" + vars.queue[i]["title"] + "\" (requested by " + vars.queue[i]["user"] + ")\n";
				}

				if(long_queue) response += "\n**...and " + (vars.queue.length - 30) + " more.**";
			}

			message.reply(response);

		}catch(ex){
			console.log(ex.stack);
		}
	}
}

module.exports = Queue;