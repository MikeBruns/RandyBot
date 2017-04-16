const vars = require('./vars');
const ytdl = require("ytdl-core");
const request = require("request");

var is_queue_empty = function() {
	return vars.queue.length === 0;
}

var play_next_song = function() {
	if(is_queue_empty()){
		vars.text_channel.sendMessage("The queue is empty nerd.");
	}
	
	var video_id = vars.queue[0]["id"];
	var title = vars.queue[0]["title"];
	var user = vars.queue[0]["user"];

	vars.now_playing_data["title"] = title;
	vars.now_playing_data["user"] = user;

	console.log(title + " " + video_id + " " + user);

	if(vars.inform_np){
		vars.text_channel.reply("Now Playing: ' " + title + " ' (requested by '" + user + "')");
		randy.user.setGame(title);
	}

	var audio_stream = ytdl("https://www.youtube.com/watch?v=" + video_id);
	//console.log(audio_stream);

	try{
		vars.voice_handler = vars.voice_connection.playStream(audio_stream, {filter: 'audioonly'}, 
			function(err, player){
				if(err){
					console.log(err);
				}
				if(player){
					//do work
				}
			}
		);
	}catch(ex){
		console.log(ex.stack);
	}

	vars.voice_handler.once("end", reason => {
		vars.voice_handler = null;
		randy.user.setGame();
		if(!vars.stopped && !is_queue_empty()){
			play_next_song();
		}
	});

	vars.queue.splice(0,1);
}

var queue_playlist = function(playlistId, message, pageToken = ''){
	request("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=" + playlistId + "&key=" + vars.youtube_key + "&pageToken=" + pageToken, (error, response, body) => {
		var json = JSON.parse(body);
		if("error" in json){
			message.reply("Send Help! " + json.error.errors[0].message + " - " + json.error.errors[0].reason);
		}else if(json.items.length === 0){
			message.reply("No videos in playlist dood.");
		}else{
			for (var i = 0; i < json.items.length; i++){
				add_to_queue(json.items[i].snippet.resourceId.videoId, message, true)
			}
			if(json.nextPageToken == null){
				return;
			}
			queue_playlist(playlistId, message, json.nextPageToken);
		}
	});
}

var add_to_queue = function(video, message, mute = false){
	if(vars.aliases.hasOwnProperty(video.toLowerCase())){
		video = vars.aliases[video.toLowerCase()];
	}

	var video_id = get_video_id(video);

	ytdl.getInfo("https://www.youtube.com/watch?v=" + video_id, (error, info) =>{
		if(error){
			message.reply("Send Help: " + video_id + " can't be played");
			console.log("Error (" + video_id + "): " + error);
		}else{
			console.log('"' + info["title"] + '" has been added to the queue.');
			vars.queue.push({title: info["title"], id: video_id, user: message.author.username});
			if(!mute){
				message.reply('"' + info["title"] + '" has been added to the queue dood.');
			}
			if(!vars.stopped && !is_bot_playing() && vars.queue.length === 1){
				play_next_song();
			}
		}
	});	
}

var search_video = function(message, query){
	request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&order=viewCount&q=" + encodeURIComponent(query) + "&key=" + vars.youtube_key, (error, response, body) =>{
		var json = JSON.parse(body);
		if("error" in json){
			message.reply("Send Help! " + json.error.errors[0].message + " - " + json.error.errors[0].reason);
		}else if(json.items.length === 0){
			message.reply("No videos dood.");
		}else{
			add_to_queue(json.items[0].id.videoId, message);
		}
	});
}

var is_bot_playing = function(){
	return vars.voice_handler !== null;
}

var get_video_id = function(string){
	var regex = /(?:\?v=|&v=|youtu\.be\/)(.*?)(?:\?|&|$)/;
	var matches = string.match(regex);

	if(matches) {
		return matches[1];
	} else {
		return string;
	}
}

module.exports.get_video_id = get_video_id;
module.exports.is_bot_playing = is_bot_playing;
module.exports.is_queue_empty = is_queue_empty;
module.exports.search_video = search_video;
module.exports.add_to_queue = add_to_queue;
module.exports.queue_playlist = queue_playlist;
module.exports.play_next_song = play_next_song;