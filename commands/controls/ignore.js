const { Command } = require('discord.js-commando');

const vars = require('../../vars');

//Broken AS FUCK right now.
class Ignore extends Command{
	constructor(client){
		super(client, {
			name: 'ignore',
			group: 'controls',
			memberName: 'ignore',
			description: 'Have me Ignore a user',
			examples: ['/ignore @user'],
			args: [{
                key: 'user',
                prompt: 'Who should I ignore?',
                type: 'user'
            }]
		})
	}

	async run(message, args){
		try{
		const user = args.user;

		//console.log(message.author);
		//console.log(message.channel.guild.roles);

		const admin = message.channel.guild.roles.find("name", "admin");
		//console.log(admin);


		if(admin.guild.find("name", message.author.username) !== null){

			var found = false;
			for(var i = 0; i < vars.ignore_list.length; i++){
				if(vars.ignore_list[i] === args.user){
					//do nothing
					found = true;
				}
			}

			if(!found){
				vars.ignore_list.push(user);
			}

			//debugging
			
			for(var i = 0; i < vars.ignore_list.length; i++){
				console.log(vars.ignore_list[i]);
				console.log(user);
			}
			
		}else{
			message.reply("You can't tell me what to do.");
		}
	}catch(ex){
		console.log(ex.stack);
	}
	}
}

module.exports = Ignore;