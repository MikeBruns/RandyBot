const { Command } = require('discord.js-commando');
const vars = require('../../vars');
const mus_funcs = require('../../music_functions');
const misc_funcs = require('../../misc_functions');

class ClearQueue extends Command{
	constructor(client){
		super(client, {
			name: 'clearqueue',
			aliases: ['clear'],
			group: 'music',
			memberName: 'clearqueue',
			description: 'Clear the Queue',
			examples: ['/clearqueue']
		})
	}

	async run(message, args){
		if(misc_funcs.isIgnored(message.author)) return;
		vars.queue = [];
		message.reply("Deleted all da songs.");
	}
}

module.exports = ClearQueue;