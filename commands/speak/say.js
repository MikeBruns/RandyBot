const { Command } = require('discord.js-commando');
const misc_funcs = require('../../misc_functions');



class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'say',
            aliases: [
                'speak',
                'copy',
                'echo',
                'parrot',
                'repeat'
            ],
            group: 'speak',
            memberName: 'say',
            description: 'Replies with the text you provide.',
            examples: ['!say Hi there!'],
            throttling:{
                usages: 2,
                duration: 5
            },
            guildOnly: true,
            args: [{
                key: 'text',
                prompt: 'What text would you like the bot to say?',
                type: 'string'
            }]
        });
    }

    async run(message, args) {
        if(misc_funcs.isIgnored(message.author)) return;
        
        const text = args.text;
        message.delete();
        return message.say(`\u180E${text}`);
    }
};

module.exports = SayCommand;