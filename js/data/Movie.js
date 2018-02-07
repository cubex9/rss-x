
Movie = function Movie(movie) {

    /**
     * object with information from omdb
     *
     * @type {Object}
     */
    this.omdb = new Object()

    /**
     * array of rss-items by id
     *
     * @type {Object}
     */
    this.rss = new Array();

    /**
     * status can be: active, archived, deleted
     *
     * @type {string}
     */
    this.status = 'new';

    /**
     * zero is 'default', smaller has lover priority
     *
     * @type {number}
     */
    this.priority = 0;


    if (movie != null) {
        this.omdb = movie.omdb;
        this.rss = movie.rss;
    }

    this.addRss = function( item ) {
        this.rss.push(item.id);
    }

    this.items = function() {
        return rss;
    }

    this.hasItem(id) {
        return rss.contains(id);
    }
}
