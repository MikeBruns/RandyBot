const { Command } = require('discord.js-commando');
const vars = require('../../vars');
const mus_funcs = require('../../music_functions');
const misc_funcs = require('../../misc_functions');


class Leave extends Command{
	constructor(client){
		super(client, {
			name: 'leave',
			aliases: ['die'],
			group: 'music',
			memberName: 'leave',
			description: 'Sends me to the graveyard, gain 500 LP',
			examples: ['/leave']
		})
	}

	async run(message, args){
		if(misc_funcs.isIgnored(message.author)) return;

		try{
			const channel = message.member.voiceChannel;

			channel.leave();

			vars.voice_channel = null;
			vars.text_channel = null;
			//console.log(vars.voice_connection);
			//vars.voice_connection.destroy();
			vars.voice_connection = null;
			vars.queue = [];
			vars.stopped = true;
			vars.inform_np = true;
			vars.now_playing_data = {};

			message.reply("Cya nerd.");
		}catch(ex){
			console.log(ex.stack);
		}
	}
}

module.exports = Leave;