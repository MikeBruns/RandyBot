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
			examples: ['/request www.youtube.com/watch?v=asdlfkjasdf'],
			args: [{
                key: 'text',
                prompt: 'What text would you like the bot to play?',
                type: 'string'
            }]
		})
	}

	async run(message, args){
		if(misc_funcs.isIgnored(message.author)) return;
		
		try{

			if(vars.aliases.hasOwnProperty(args.text.toLowerCase())){
				args.text = aliases[args.text.toLowerCase()];
			}

			var regExp = /^.*(youtu.be\/|list=)([^#\&\?]*).*/;
	        var match = args.text.match(regExp);

	        //console.log(args.text);
	        //console.log(match);
	        if(match !== null && match && match[2]){
	        	mus_funcs.queue_playlist(match[2], message);
	        }else{
	        	mus_funcs.add_to_queue(args.text, message);
	        }

	        message.reply("Thanks Thanks Thanks.");

    	}catch(ex){
    		console.log(ex.stack);
    	}
	}
}

module.exports = Request;