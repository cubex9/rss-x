module.exports = function (title,year, success, error) {

    // Get the data as utf8 strings.
    // If an encoding is not set, Buffer objects will be received.
    //req.setEncoding('utf8');


    let body = '';

    //let res = null;

    var request = require('request')
    var req = request(`http://www.omdbapi.com/?apikey=7b594480&t=${title.replace(/\s/, "+")}&y=${year}&plot=full`)


    // Readable streams emit 'data' events once a listener is added
    req.on('data', (chunk) => {
        body += chunk;
    });

    // req.on('response', (r) => {
    //     res = r;
    // })

    req.on('end', () => {

        var o = JSON.parse(body);
        if (o.Response == 'True') {
            success(o);
        } else {
            error(o);
        }
    });
}