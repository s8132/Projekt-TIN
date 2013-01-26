var http = require('http'),
	virtualhost = require('virtualhost'),
	fs = require('fs'),
	host1 = require('./host1/host1.js').host1,
	host2 = require('./host2/host2.js').host2,
	host3 = require('./host3/host3.js').host3,
	admin = require('./admin/admin.js').admin;

	//Próba dodawania hostów
	//var tab = [require('../express/host2/app').app, require('../express/host3/app').app];


	var handler1 = function(req, res){
		console.log(req);
		res.end("sd");
		// var data = new Date();
		// var str = '';
		// str += data.getDate() + '.' + data.getMonth()+1 + '.' + data.getFullYear();
		// str += ' ' + data.getHours() + ':' + data.getMinutes();
		// console.log(str);
		// res.end('Host I');
	};

	var apps = {
		"host1.local" : host1,
		"host2.local" : host2,
		"host3.local" : host3,
		"admin.local" : admin
	};

	//Próba dodawania hostów
	//apps['host3.local']	= tab[0];

http.createServer(virtualhost(apps, function(req, res){
	console.log(req);
	res.writeHeader(200, {
		"Content-Type": "text/html"
	});
	res.end("brak dopasowania");
})).listen(9090, function(){
	console.log("Nasłuchuje na porcie 9090");
});