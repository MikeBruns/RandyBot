const { Command } = require('discord.js-commando');
const misc_funcs = require('../../misc_functions');




class DMCommand extends Command{
	constructor(client){
		super(client, {
			name: 'dm',
			group: 'speak',
			memberName: 'dm',
			description: 'Sends a message to the user you mention.',
			examples: ['!dm @User Hi there!'],
			args: [
			{
				key: 'user',
				prompt: 'Which user do you want to send a message to?',
				type: 'user'
			},
			{
				key: 'content',
				prompt: 'What do you want to say?',
				type: 'string',
				validate: text => {
					if(text.length < 201){
						return true
					}
					return 'Message Content is too long, below 200 characters please.'
				}
			}
			]
		})
	}

	async run(message, args){
		if(misc_funcs.isIgnored(message.author)) return;
		
		const user = args.user;
		const content = args.content;
		message.delete();
		return user.send(content);
	}
}

module.exports = DMCommand;