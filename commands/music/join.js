const { Command } = require('discord.js-commando');
const vars = require('../../vars');
const mus_funcs = require('../../music_functions');
const misc_funcs = require('../../misc_functions');


class Join extends Command{
	constructor(client){
		super(client, {
			name: 'join',
			aliases: ['bind'],
			group: 'music',
			memberName: 'join',
			description: 'Binds me to your voice channel',
			examples: ['/join']
		})
	}

	async run(message, args){
		if(misc_funcs.isIgnored(message.author)) return;

		try{
			const channel = message.member.voiceChannel;
			vars.voice_channel = channel;
			vars.text_channel = message;
			channel.join()
			.then(connection => {
				console.log('Connected!');
				message.reply("sup dood");
				vars.voice_connection = connection;
			}).catch(console.error);
		}catch(ex){
			console.log(ex.stack);
		}
	}
}

module.exports = Join;