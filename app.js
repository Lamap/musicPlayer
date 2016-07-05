var express = require('express');
var app = express();
var PORT = 8080;

app.get('/', function (req, res) {
  res.send('There will be music and magic here');
});

app.listen(8080, function () {
  console.log('Example app listening on port ' + PORT + '!');
});