const { Command } = require('discord.js-commando');
const vars = require('../../vars');
const misc_funcs = require('../../misc_functions');



class Stop extends Command{
	constructor(client){
		super(client, {
			name: 'stop',
			group: 'music',
			memberName: 'stop',
			description: 'Stops whatever music is playing',
			examples: ['/stop']
		})
	}

	async run(message, args){
		if(misc_funcs.isIgnored(message.author)) return;
		
		try{

			if(vars.stopped){
				message.reply("No music is currently playing");
			}else{
				vars.stopped = true;
				if(vars.voice_handler !== null){
					vars.voice_handler.end();
				}
				message.reply("Stopping!");
			}

		}catch(ex){
			console.log(ex.stack);
		}
	}
}

module.exports = Stop;