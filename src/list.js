var fs = require('fs');
var LIST_STRUCTURE = ['youtube', 'title', 'author', 'file'];
var LIST_LINE_SEPARATOR = '\n';
var LIST_SEPARATOR = ',';


module.exports = function(csv, callback) {
    var original = [];
    var items = {};

    if(typeof callback !== "function") {
        throw('list needs callback');
    }
    fs.readFile(csv, 'utf8', onCsvLoaded);

    function onCsvLoaded(err, data) {
        if(err) {
            return callback(err);
        }
        console.log(err);
        var lines = data.split(LIST_LINE_SEPARATOR);
        original = [];
        for (var i = 0; i < lines.length; i++) {
            var lineElements = lines[i].split(LIST_SEPARATOR)
            var listObject = {};
            for (var p = 0; p < LIST_STRUCTURE.length; p++) {
                if (!lineElements[p]) {
                    continue;
                }
                listObject[LIST_STRUCTURE[p]] = lineElements[p].trim();
            }
            listObject.id = i;
            original.push(listObject);
        }
        items = {
            played: [],
            toPlay: JSON.parse(JSON.stringify(original))
        };
        callback(null, items);
    }

    return {
        items: items,
        original: original
    };
};