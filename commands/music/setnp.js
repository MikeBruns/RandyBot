const { Command } = require('discord.js-commando');
const vars = require('../../vars');
const mus_funcs = require('../../music_functions');
const misc_funcs = require('../../misc_functions');


class SetNP extends Command{
	constructor(client){
		super(client, {
			name: 'setnp',
			aliases:[
			'setnowplaying','set-now-playing','set_now_playing','set-cur-song',
			'set-current-song','set current song', 'set now playing'
			],
			group: 'music',
			memberName: 'setnp',
			description: 'Toggle announcing of songs',
			examples: ['/setnp, /setnowplaying'],
			args: [{
                key: 'text',
                prompt: 'Toggle on or off?',
                type: 'string'
            }]
		})
	}

	async run(message, args){
		if(misc_funcs.isIgnored(message.author)) return;
		
		const text = args.text;
		if(text.toLowerCase() == "on"){
			var response = "Will announce song names in chat now dood";
			vars.inform_np = true;
		}else if (text.toLowerCase() == "off"){
			var response = "Will no longer announce song names in chat dood";
			vars.inform_np = false;
		}else{
			var response = "BUT SIR!";
		}

		message.reply(response);
	}
}

module.exports = SetNP;