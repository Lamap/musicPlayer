var Player = require('stream-player');
var MP3_DIR = './mp3';
var TIMEOUT = 1000;

module.exports = function (list) {
    var plr = null;
    var isPlaying = false;
    function play() {
        if(plr) {
            //console.plr.getQueue();
            plr.pause();
            console.log(plr.getQueue());
            plr.remove();
            delete plr;
        }
        setTimeout(function() {
            isPlaying = true;
            var mp3 = MP3_DIR + '/' + list.toPlay[0].file + '.mp3';
            plr = new Player();
            plr.add(mp3);
            plr.on('play end', songEnded);
            plr.on('error', onError);
            plr.play();
        }, TIMEOUT);

    }

    function playNext() {
        console.log('attempting to play the next');
        if(list.toPlay.length) {
            console.log("Playing next song:", list.toPlay[0].author, list.toPlay[0].title);
            list.played.push(list.toPlay[0]);
            list.toPlay.splice(0, 1);
            play();
            //TODO: send message to the listServer
            return;
        }

        // TODO: restart list
    }

    function prev() {

    }

    function pause() {
        isPlaying = !isPlaying;
        plr.pause();
    }

    function songEnded() {
        console.log('Song ended');
        playNext();
    }
    function onError(err) {
        console.log('There was some problem playing the song:', err);
    }
    return {
        play: play,
        next: playNext,
        pause: pause
    }
};