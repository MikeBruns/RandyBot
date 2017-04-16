const {Command} = require('discord.js-commando');
const misc_funcs = require('../../misc_functions');




class DiceRollCommand extends Command {

	constructor(client){
		super(client, {
			name: 'roll',
			group: 'random',
			memberName: 'roll',
			description: 'Rolls a die',
			examples: ['roll']
		});
	}

	async run(message, args){
		if(misc_funcs.isIgnored(message.author)) return;
		
		var roll = Math.floor(Math.random() * 12) + 1;
		return message.reply("You rolled " + roll + "!");
	}

}

module.exports = DiceRollCommand;