const request = require('then-request')

module.exports = function (item, success) {
    request('GET', `http://www.omdbapi.com/?apikey=7b594480&t=${item.title.replace(/\s/, '+')}&y=${item.year}&plot=full`)
        .done((res) => {
            success(JSON.parse(res.getBody('utf8')))
        })
}
