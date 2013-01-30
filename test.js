var obj = {
	'aaa': 5,
	'bbb': 3
};

var obj2 = [
	{get: 'aaa'},
	{get: 'bbb'},
	{get: 'ccc'}
];

var a = ['aaa', 1],
	b = ['bbb', 2];
var tab = [a, b];

console.log(tab);

obj2.forEach(function(k, v){
	console.log("k = " + k.get + ", v = " + v);
	//var a = k.get;
	// if(obj[a]!==undefined){
	// 	obj[a] = obj[a]+1;
	// }else{
	// 	obj[a] = 1;
	// }
	
	if(a.indexOf(k.get)!==-1){
		a[1]+=1;
	}else if(b.indexOf(k.get)!==-1){
		b[1] += 1;
	}
});

console.log(tab);

var str = "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:18.0) Gecko/20100101 Firefox/18.0";

console.log(str.match(/Firefox/)[0]==="Firefox");

// console.log(obj);

// var str = "28.01.2013 4:21:25";

// console.log(str.match(/\d{2}.\d{2}.\d{4}/)[0]);

// var lista = [
// 	{naza: 'lista1', produkty: [
// 		{nazwa: 'asdf', ilosc: 4, jednostki: 'sad'},
// 		{nazwa: 'asdf', ilosc: 4, jednostki: 'sad'}
// 	]},
// 	{naza: 'lista1', produkty: [
// 		{nazwa: 'asdf', ilosc: 4, jednostki: 'sad'},
// 		{nazwa: 'asdf', ilosc: 4, jednostki: 'sad'}
// 	]}
// ];

// <ul>
// 	<li>/*dane*/ <button></button><button></button></li>
// <ul>