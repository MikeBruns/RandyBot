//const Discord = require('discord.js');

const commando = require('discord.js-commando');
const ytdl = require("ytdl-core");
const vars = require('./vars');

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





/*
randy.on('message', (message) => {
	if(message.content == 'ping'){
		//message.channel.sendMessage('pong');
		message.reply('pong');
	}
});
*/

randy.login('MzAyOTA5MDY5MDUwNjQyNDMy.C9QZmw.j_bXtik48e6cetajgRatINi9Sk0');

//youtube api key = AIzaSyDR6HmSoTCv6qZykcs3B-AbRM41AWfMbCE
/*
exports.run = function(server_name, text_channel_name, voice_channel_name, aliases_path, token) {

	vars.aliases_file_path = aliases_path;

	randy.on("ready", () => {
		var server = randy.guilds.find("name", server_name);
		if(server === null) throw "Couldn't find server '" + server_name + "'";

		var voice_channel = server.channels.find(chn => chn.name === voice_channel_name && chn.type === "voice"); //The voice channel the bot will connect to
		if(voice_channel === null) throw "Couldn't find voice channel '" + voice_channel_name + "' in server '" + server_name + "'";
		
		text_channel = server.channels.find(chn => chn.name === text_channel_name && chn.type === "text"); //The text channel the bot will use to announce stuff
		if(text_channel === null) throw "Couldn't find text channel '#" + text_channel_name + "' in server '" + server_name + "'";

		voice_channel.join().then(connection => {voice_connection = connection;}).catch(console.error);

		fs.access(aliases_file_path, fs.F_OK, (err) => {
			if(err) {
				aliases = {};
			} else {
				try {
					aliases = JSON.parse(fs.readFileSync(aliases_file_path));
				} catch(err) {
					aliases = {};
				}
			}
		});

		randy.user.setGame();
		console.log("Connected!");
	});

	randy.login('MzAyOTA5MDY5MDUwNjQyNDMy.C9QZmw.j_bXtik48e6cetajgRatINi9Sk0');
}
*/