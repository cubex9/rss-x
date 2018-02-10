var http = require('http');
var fs = require('fs');

module.exports = {

    copyTo: function(src,dst) {

        try {
            var file = fs.createWriteStream(dst);
            var request = http.get(src, function (response) {
                response.pipe(file);
            });
        } catch(e) {
            throw e;
        }
    },
}