/*jshint node: true, browser: true, jquery: true */
/*global io: false */
$(document).ready(function () {
    'use strict';

    var socket = io.connect('http://localhost:9090'),
        log = '',
        host1Browser = {},
        host1BrowserChart = [],
        host2Browser = {},
        host2BrowserChart = [],
        host3Browser = {},
        host3BrowserChart = [],
        host1Page = {},
        host1PageChart = [],
        host2Page = {},
        host2PageChart = [],
        host3Page = {},
        host3PageChart = [];

    var sortPages = function(hostPagesObject, value){
        if(hostPagesObject[value]!==undefined){
            hostPagesObject[value] = hostPagesObject[value] + 1;
        }else{
            hostPagesObject[value] = 1;
        }
    };
   
    var sortBorwsers = function(hostBrowserObject, value){
        if(value.match(/Firefox/)!==null){
            if(hostBrowserObject.Firefox!==undefined){
                hostBrowserObject.Firefox = hostBrowserObject.Firefox + 1;
            }else{
                hostBrowserObject.Firefox = 1;
            }
        }else if(value.match(/Chrome/)!==null){
            if(hostBrowserObject.Chrome!==undefined){
                hostBrowserObject.Chrome = hostBrowserObject.Chrome + 1;
            }else{
                hostBrowserObject.Chrome = 1;
            }
        }else if(value.match(/Opera/)!==null){
            if(hostBrowserObject.Opera!==undefined){
                hostBrowserObject.Opera = hostBrowserObject.Opera + 1;
            }else{
                hostBrowserObject.Opera = 1;
            }
        }else if(value.match(/MSIE/)!==null){
            if(hostBrowserObject.MSIE!==undefined){
                hostBrowserObject.MSIE = hostBrowserObject.MSIE + 1;
            }else{
                hostBrowserObject.MSIE = 1;
            }
        }else{
            if(hostBrowserObject.Other!==undefined){
                hostBrowserObject.Other = hostBrowserObject.Other + 1;
            }else{
                hostBrowserObject.Other = 1;
            }
        }
    };

    var objectToArray = function(object, array){
        Object.keys(object).forEach(function(value){
            array.push([value, object[value]]);
        });
    };

    var drawChart = function(div, data){
        new Highcharts.Chart({
            chart: {
                renderTo: div,
                type: 'pie',
                plotBackgroundColor: '#eeeeee',
                backgroundColor: '#eeeeee',
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: 'Statyska odwiedzanych stron'
            },
            series: [{
                name: 'ilosc',
                data: data
           } ]
        });
    };

    var clearHTML = function(){
        $('#logsTable tbody').html('');
        $('#logsTable thead tr.filters').remove();
        $('#host1 #pages ul').html('');
    };

    var generateChartForAll = function(){
        /*=== <HOST1> ===*/

            //Wygenerowanie tablicy dla wykresu stron host1
            objectToArray(host1Page, host1PageChart);

            //Wygenerowanie tablicy dla wykresu przegladarek host1
            objectToArray(host1Browser, host1BrowserChart);

            //Rysowanie wykresu stron dla host1
            drawChart('graphPage1', host1PageChart);

            //Rysowanie wykresu przegladarek dla host1
            drawChart('graphBrowser1', host1BrowserChart);

            /*=== </HOST1> ===*/

            /*=== <HOST2> ===*/

            //Wygenerowanie tablicy dla wykresu stron host2
            objectToArray(host2Page, host2PageChart);

            //Wygenerowanie tablicy dla wykresu przegladarek host2
            objectToArray(host2Browser, host2BrowserChart);

            //Rysowanie wykresu stron dla host2
            drawChart('graphPage2', host2PageChart);

            //Rysowanie wykresu przegladarek dla host2
            drawChart('graphBrowser2', host2BrowserChart);

            /*=== </HOST2> ===*/

            /*=== <HOST3> ===*/

            //Wygenerowanie tablicy dla wykresu stron host3
            objectToArray(host3Page, host3PageChart);

            //Wygenerowanie tablicy dla wykresu przegladarek host3
            objectToArray(host3Browser, host3BrowserChart);

            //Rysowanie wykresu stron dla host3
            drawChart('graphPage3', host3PageChart);

            //Rysowanie wykresu przegladarek dla host1
            drawChart('graphBrowser3', host3BrowserChart);

            /*=== </HOST3> ===*/
    };

    var resetaVariables = function(){
        host1Browser = {},
        host1BrowserChart = [],
        host2Browser = {},
        host2BrowserChart = [],
        host3Browser = {},
        host3BrowserChart = [],
        host1Page = {},
        host1PageChart = [],
        host2Page = {},
        host2PageChart = [],
        host3Page = {},
        host3PageChart = [];
    };

    var buildLogTable = function(value){
        if(value.statusCode>199 && value.statusCode<400){
            $('#logsTable tbody').append('<tr><td>'+value.date+'</td><td>'+value.ipClient+'</td><td>'+value.hostname+'</td><td>'+value.method+'</td><td>'+value.url+'</td><td>'+value.statusCode+'</td><td>'+value.userAgent+'</td></tr>');
        }else if(value.statusCode>400 && value.statusCode<500){
            $('#logsTable tbody').append('<tr id="warn"><td>'+value.date+'</td><td>'+value.ipClient+'</td><td>'+value.hostname+'</td><td>'+value.method+'</td><td>'+value.url+'</td><td>'+value.statusCode+'</td><td>'+value.userAgent+'</td></tr>');
        }else{
            $('#logsTable tbody').append('<tr id="error"><td>'+value.date+'</td><td>'+value.ipClient+'</td><td>'+value.hostname+'</td><td>'+value.method+'</td><td>'+value.url+'</td><td>'+value.statusCode+'</td><td>'+value.userAgent+'</td></tr>');
        }
    };

    var sortHosts = function(value){
        if(value.hostname==='host1.local'){
            //Posegregowanie stron dla host1
            sortPages(host1Page, value.url);

            //Po segregowanie przegladarek dla host1
            sortBorwsers(host1Browser, value.userAgent);
        }else if(value.hostname==='host2.local'){
            //Posegregowanie stron dla host2
            sortPages(host2Page, value.url);

            //Po segregowanie przegladarek dla host2
            sortBorwsers(host2Browser, value.userAgent);
        }else if(value.hostname==='host3.local'){
            //Posegregowanie stron dla host3
            sortPages(host3Page, value.url);

            //Po segregowanie przegladarek dla host3
            sortBorwsers(host3Browser, value.userAgent);
        }
    };

    console.log('connecting…');

    socket.on('connect', function(){
        console.log('connected!');
    });

    //Odbieranie danych z pliku logow JSON-owych
    socket.on('message', function(msg){
        var data = msg.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

        //Czasami dane przychodza w porcjach wiec trzeba je polaczyć odpowiednio
        if(log.lastIndexOf("]}")!==-1){
            log = log.replace("]}", ",{") + data;
        }else{
            log = log + data;
        }

        //Jezeli ostatni znak z polaczonych danych to "]}" to mozna to parsowac to JSON
        if(log.lastIndexOf("]}")!==-1){
            //Parsowanie JSON
            var dane = JSON.parse(log).logs;
            
            //Przy kolejnych zmiannach trzeba wszystko wyczscic
            clearHTML();

            //Reset zmiennych do wykresów
            resetaVariables();
          
            //Budowanie interfejsu z danymi na podstawie JSON-a
            dane.forEach(function(value){
                //Tworzenie tabeli logow
                buildLogTable(value);
               
                //Segregowanie wedlug hostow
                sortHosts(value);
            });
            
            //Dodanie filtrow do tabeli
            $('#tabelka').tableFilter();

            //Generowanie wykresow dla wszystkich hsotow
            generateChartForAll();
        }
    });
});
