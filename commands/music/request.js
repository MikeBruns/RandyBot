const { Command } = require('discord.js-commando');
const vars = require('../../vars');
const mus_funcs = require('../../music_functions');
const misc_funcs = require('../../misc_functions');


class Request extends Command{
	constructor(client){
		super(client, {
			name: 'request',
			aliases: ['add'],
			group: 'music',
			memberName: 'request',
			description: 'Request a song/playlist',
			examples: ['/request www.youtube.com/watch?v=asdlfkjasdf']
		})
	}

	async run(message, args){
		if(misc_funcs.isIgnored(message.author)) return;
		
		if(vars.aliases.hasOwnProperty(args[1].toLowerCase())){
			args[1] = aliases[params[1].toLowerCase()];
		}

		var regExp = /^.*(youtu.be\/|list=)([^#\&\?]*).*/;
        var match = args[1].match(regExp);

        if(match && match[2]){
        	mus_funcs.queue_playlist(match[2], message);
        }else{
        	mus_funcs.add_to_queue(args[1], message);
        }
	}
}

module.exports = Request;