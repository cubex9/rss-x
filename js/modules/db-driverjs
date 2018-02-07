var DB = require('nosql');
var nosql = DB.load('./rss-x.nosql');

module.exports = function() {

    this.getMovie = function(id) {
        return nosql.get('movie.'+id)
    }

    this.setMovie = function(movie) {
        nosql.set('movie.'+movie.imdbID,movie);

        return this;
    }

    this.getItem = function(guid) {
        return nosql.get('item.' + guid);
    }

    this.setItem = function(item) {
        nosql.set('item.' + item.guid, item);

        return this;
    }
}

