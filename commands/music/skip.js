const { Command } = require('discord.js-commando');
const vars = require('../../vars');
const mus_funcs = require('../../music_functions');
const misc_funcs = require('../../misc_functions');


class Skip extends Command{
	constructor(client){
		super(client, {
			name: 'skip',
			group: 'music',
			memberName: 'skip',
			description: 'Skip the current song',
			examples: ['/skip']
		})
	}

	async run(message, args){
		if(misc_funcs.isIgnored(message.author)) return;
		
		if(vars.voice_handler !== null){
			message.reply("Cya nerd.");
			vars.voice_handler.end();
		}else{
			message.reply("Nothing being played u tard.");
		}
	}
}

module.exports = Skip;