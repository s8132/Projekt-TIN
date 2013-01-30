var logs = require('../lib/logs.js').logs;

exports.host2 = function(req, res){
	res.writeHead(200);
	res.end("Host II");

	logs(req, res);
};