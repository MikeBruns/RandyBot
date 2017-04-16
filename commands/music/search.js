const { Command } = require('discord.js-commando');
const vars = require('../../vars');
const mus_funcs = require('../../music_functions');
const misc_funcs = require('../../misc_functions');


class Search extends Command{
	constructor(client){
		super(client, {
			name: 'search',
			group: 'music',
			memberName: 'search',
			description: 'Search for a vid on youtube',
			examples: ['/search Bag Raiders Shooting Star 1 hour']
		})
	}

	async run(message, args){
		if(misc_funcs.isIgnored(message.author)) return;
		
		if(vars.youtube_key === null){
			message.reply("My Youtube API key isn't working... ayyyy");
		}else{
			var q = "";
			for(var i = 1; i < args.length; i++){
				q += args[i] + " ";
			}
			mus_funcs.search_video(message, q);
		}
	}
}

module.exports = Search;