const { Command } = require('discord.js-commando');
const vars = require('../../vars');
const mus_funcs = require('../../music_functions');
const misc_funcs = require('../../misc_functions');


class Resume extends Command{
	constructor(client){
		super(client, {
			name: 'resume',
			aliases: ['play'],
			group: 'music',
			memberName: 'resume',
			description: 'Resumes The playlist',
			examples: ['/resume']
		})
	}

	async run(message, args){
		if(misc_funcs.isIgnored(message.author)) return;
		
		try{

			if(vars.stopped){
				vars.stopped = false;
				if(!mus_funcs.is_queue_empty()){
					mus_funcs.play_next_song();
				}else{
					message.reply("There isn't any music to play, dumbass.");
				}
			}else{
				message.reply("Music is already playing, dumbass.");
			}

		}catch(ex){
			console.log(ex.stack);
		}
	}
}

module.exports = Resume;