const vars = require('./vars');

var isIgnored = function(user){
	for(var i = 0; i < vars.ignore_list.length; i++){
		if(vars.ignore_list[i] === user){
			return true;
		}
	}
	return false;
}

module.exports.isIgnored = isIgnored;