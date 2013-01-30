var logs = require('../lib/logs.js').logs;

exports.host3 = function(req, res){
	res.writeHead(200);
	res.end("Host III");

	logs(req, res);
};