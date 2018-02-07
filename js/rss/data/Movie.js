
Movie = function Movie(movie) {

    this.omdb = new Object()
    this.rss = new Object()

    if (movie != null) {
        this.omdb = movie.omdb;
        this.rss = movie.rss;
    }

    this.addRss = function( item ) {
        this.rss['guid' + item.guid] = item;
    }

    this.rssByGuid = function( guid ) {
        return rss['guid' + guid];
    }
}
