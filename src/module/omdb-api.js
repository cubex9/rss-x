const request = require('then-request')

module.exports = function (title, year, success) {
    request('GET', `http://www.omdbapi.com/?apikey=7b594480&t=${title.replace(/\s/, '+')}&y=${year}&plot=full`)
        .done((res) => {
            success(JSON.parse(res.getBody('utf8')))
        })
}
