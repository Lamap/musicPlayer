var express = require('express');
var app = express();
var player2 = require('player');
var PORT = 3333;
var PLAYLIST_URL = process.env.dev ? 'http://localhost:8080' : 'http://musicplayer-lamap.rhcloud.com';
var request = require('request');

var List = require('./src/list.js');
var Player = require('./src/player.js');


var dancePlayer = null;

var danceList = List('./mp3/buli.csv', function (err, items) {
    dancePlayer = Player(items);
    dancePlayer.play();
    var ConsoleNavigator = require('./src/navigation.js')(dancePlayer);
    //TODO: sent initial list to list server
    initList(items);
});

request({url: PLAYLIST_URL + '/list', json: true}, onListArrived);
function onListArrived (err, res, body) {
    console.log(err);
    console.log(body);
}

function initList(list) {
    var url = PLAYLIST_URL + '/init2';
    console.log(url);
    request({
        url: url,
        method: 'POST',
        json: list
    }, function(err, res, body) {
        if (err) {
            return console.log("failed to init list server: ", err);
        };
        console.log('List server is initialized');
    });
}