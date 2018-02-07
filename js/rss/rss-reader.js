
require('./../data/Movie.js')
require('./../data/RssSize.js')

var FeedParser = require('feedparser');
var request = require('request'); // for fetching the feed

// rss-tools
var mapper = require('./rss-mapper.js')
var filter = require('./rss-filter.js')

// in-app-modules
var omdb = require('./../modules/omdb-api.js')
var magnet = require('./../modules/magnet-link.js')


var req = request('https://www.ettv.tv/rss.php?cat=1,2,3,42,47,49')
var feedparser = new FeedParser();


req.on('error', function (error) {
    // handle any request errors
});

req.on('response', function (res) {
    var stream = this; // `this` is `req`, which is a stream

    if (res.statusCode !== 200) {
        this.emit('error', new Error('Bad status code'));
    }
    else {
        stream.pipe(feedparser);
    }
});

feedparser.on('error', function (error) {
    // always handle errors
});

feedparser.on('readable', function () {
    // This is where the action is!
    var stream = this; // `this` is `feedparser`, which is a stream
    var meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance
    var i;

    while ( i = stream.read()) {

        console.log(i);

        var items = store.get('rss.items', new Object());

        var t = store.getItem(i.guid);

        // jeste neni ulozena, je nova
        if( t == null || items['guid' + i.guid] == 'new') {

            var item = i;

            items['guid' + i.guid] = 'new';

            i["ptn"] = ptn(item.title);

            i["computed"] = new RssSize(i.summary);

            console.log(i.summary + " => " + i.computed);

            if (filter(i)) {

                omdb(item.ptn.title, item.ptn.year,
                    o => {

                        console.log(o);

                        // save data, if movie exist, only append new source.guid
                        var movie = new Movie(store.get('movie.' + o.imdbID,null));

                        movie.omdb = o;
                        movie.addRss(item);

                        if($('#'+o.imdbID).length == 0) {
                            $('#rss').append(mapper(movie));
                        }

                        var color = (item.computed.size > 1 && item.computed.size < 2) ? 'green' : 'red';

                        // append magnet
                        magnet(o.imdbID,item.guid,item.link,color);

                        // store
                        store.set('movie.' + o.imdbID, movie);
                    },
                    e => {
                        console.log('ERROR: ' + item.ptn.title + ' | ' + item.guid );
                    }
                );
            }
        }

        store.set('rss.items', items );
    }
});


