const { Command } = require('discord.js-commando');
const vars = require('../../vars');
const mus_funcs = require('../../music_functions');
const misc_funcs = require('../../misc_functions');


class NP extends Command{
	constructor(client){
		super(client, {
			name: 'np',
			aliases:[
			'nowplaying','now-playing','now_playing','cur-song',
			'current-song','current song', 'now playing'
			],
			group: 'music',
			memberName: 'np',
			description: 'Ask what is now playing',
			examples: ['/np, /nowplaying']
		})
	}

	async run(message, args){
		if(misc_funcs.isIgnored(message.author)) return;

		try{

			var response = "Now playing: ";
			if(mus_funcs.is_bot_playing()){
				response += "\"" + vars.now_playing_data["title"] + "\" (requested by " + vars.now_playing_data["user"] + ")";
			}else{
				response += "nothing you dumb fuck.";
			}

			message.reply(response);

		}catch(ex){
			console.log(ex.stack);
		}
	}
}

module.exports = NP;