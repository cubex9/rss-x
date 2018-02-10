//
var DB = require('nosql');
var nosql = DB.load('./rss-x.nosql');

module.exports = function() {

    this.getMovie = function(id) {
        return nosql.get('movie.'+id)
    }

    this.setMovie = function(movie) {
        nosql.set('movie.'+movie.id,movie);

        return this;
    }

    this.getItem = function(id) {
        return nosql.get('item.' + id);
    }

    this.setItem = function(item) {
        nosql.set('item.' + item.id, item);

        return this;
    }

    this.getMovieItems = function(movie) {
        nosql.search( (b) => {

            b.where( id, eq, movie.id )
            return b;
        }
    }
}

