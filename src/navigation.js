var keypress = require('keypress');
var root = null;
var readline = require('readline');

//var plr = null;
 


module.exports = function (player) {
    keypress(process.stdin);
    process.stdin.on('keypress', function (ch, key) {
      if (key.name === 'right') {
        player.next();
      }
      if (key.name === 'space') {
        player.pause();
      }
    });

    const rl = readline.createInterface({
    input: process.stdin,
      output: process.stdout
    });

    rl.on('line', function (input) {
      console.log('Line entered:', input);
      //TODO: set other playlist
      //player.setList();
    });
};