/*jshint node: true, browser: true, jquery: true */
/*global io: false */
$(document).ready(function () {
    'use strict';



    var socket = io.connect('http://localhost:9090'),
        entry_el = $('#entry'),
        host1Obj = [],
        host2Obj = [],
        host3Obj = [];

    var log = '',
        logInJson;

   
    console.log('connecting…');

    var toJson = function(dane){
        if(dane.lastIndexOf("]}")!==-1){
            return JSON.parse(dane);
        }
    };

    var sortHosts = function(dane){
        if(dane!==undefined){
            dane.logs.forEach(function(value, key){
               
            });
        }
    };

    socket.on('connect', function () {
        console.log('connected!');
    });

    console.log(log.lastIndexOf(']}'));

    socket.on('message', function (msg) {
        var data = msg.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        console.log("dostalem: " + msg);
        if(log.lastIndexOf("]}")!==-1){
            log = log.replace("]}", ",{") + data;
        }else{
            log = log + data;
        }

        if(log.lastIndexOf("]}")!==-1){
            //console.log(JSON.parse(log));    
            
            var dane = JSON.parse(log).logs;
            
            $('#logsTable tbody').html('');
            $('#logsTable thead tr.filters').remove();
            $('#host1 #pages ul').html('');
             var allRequests = 0,
                host1Request = 0,
                host2Request = 0,
                host3Request = 0,
                host1Browser = [],
                host2Browser = [],
                host3Browser = [],
                host1Page = {},
                host2Page = [],
                host3Page = [],
                test = [];


            dane.forEach(function (value, key){

                if(value.statusCode>199 && value.statusCode<400){
                    $('#logsTable tbody').append('<tr><td>'+value.date+'</td><td>'+value.ipClient+'</td><td>'+value.hostname+'</td><td>'+value.method+'</td><td>'+value.url+'</td><td>'+value.statusCode+'</td><td>'+value.userAgent+'</td></tr>');
                }else if(value.statusCode>400 && value.statusCode<500){
                    $('#logsTable tbody').append('<tr id="warn"><td>'+value.date+'</td><td>'+value.ipClient+'</td><td>'+value.hostname+'</td><td>'+value.method+'</td><td>'+value.url+'</td><td>'+value.statusCode+'</td><td>'+value.userAgent+'</td></tr>');
                }else{
                    $('#logsTable tbody').append('<tr id="error"><td>'+value.date+'</td><td>'+value.ipClient+'</td><td>'+value.hostname+'</td><td>'+value.method+'</td><td>'+value.url+'</td><td>'+value.statusCode+'</td><td>'+value.userAgent+'</td></tr>');
                }
               

                if(value.hostname==='host1.local'){
                    host1Request += 1;
                    if(host1Page[value.url]!==undefined){
                        host1Page[value.url] = host1Page[value.url] + 1;
                    }else{
                        host1Page[value.url] = 1;
                    }
                }else if(value.hostname==='host2.local'){
                    host2Request += 1;
                }else if(value.hostname==='host2.local'){
                    host2Request += 1;
                }
            });
            
            
        $('#tabelka').tableFilter();
            var pages = Object.keys(host1Page);

            Object.keys(host1Page).forEach(function(value, key){
               // console.log(value + " : " + host1Page[value]);
                //$('#host1 #pages ul').append('<li>'+value+' = ' + host1Page[value] + '</li>');
                test.push([value, host1Page[value]]);
            });

            var chart = new Highcharts.Chart({
            chart: {
                renderTo: 'graphPage',
                type: 'pie',
                plotBackgroundColor: '#eeeeee',
                backgroundColor: '#eeeeee',
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: 'Statyska odwiedzanych stron'
            },
            xAxis:{
                categories: pages
            },
            series: [{
                name: 'ilosc',
                data: test
           } ]
        });
     
        }
        
        

        
        //logInJson = toJson(log);

        //sortHosts(logInJson);

        //$('#logs').html(log);
    });

   
});
