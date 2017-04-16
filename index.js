//const Discord = require('discord.js');

const commando = require('discord.js-commando');
const ytdl = require("ytdl-core");
const vars = require('./vars');
const api_keys = require('./api_keys');

randy = new commando.Client({
	commandPrefix: '/',
	owner: 'emrickgj#5891',
	disableEveryone: true,
	unknownCommandResponse: false
});

randy.registry.registerGroups([
	['random', 'Random'],
	['speak', 'Speak'],
	['music', 'Music'],
	['controls', 'Controls']

	]);
randy.registry.registerDefaults();
randy.registry.registerCommandsIn(__dirname + "/commands");

randy.login(api_keys.disc_key);