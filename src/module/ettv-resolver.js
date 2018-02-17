const Resolver = require('./api/resolver.js')
const EttvItem = require('./data/EttvItem.js')

/**
 * Resolving specialites of ETTV channel
 * @author kubasekA
 */
class EttvResolver extends Resolver {
    constructor ({conf, onInsertMovie, onInsertItem, onError}) {
        super({conf, onInsertMovie, onInsertItem, onError})
    }

    /**
     * converze source entity from RSS chanel to RssItem
     *
     * @param item
     */
    convert (item) {
        return EttvItem.fromRss(item)
    }
}

module.export = EttvResolver
// /**
//  *
//  * @param ch channel
//  * @param i item object
//  */
// module.exports = function(ch,i) {
//
//     // is item in db ?
//     var t = store.getItem(i.guid);
//
//     // jeste neni ulozena, je potreba zjistit o jaky film se jedna
//     if( t == null ) {
//
//         t = new RssItem(ch,i);
//
//         if (filter(t)) {
//
//             omdb(t.parsed.title, t.parsed.year,
//                 o => {
//
//                     // try, get movie from DB
//                     var movie = store.getMovie(o.imdbID);
//
//                     // novy
//                     if( movie == null ) {
//                         movie = new Movie(o);
//                         store.setMovie(movie);
//                     }
//
//                     movie.addRss(t);
//                     store.update(movie);
//
//                     t.setMovie(movie);
//
//                     var movie = new Movie(store.getMovie(o.imdbID));
//
//                     movie.omdb = o;
//                     movie.addRss(item);
//
//                     if($('#'+o.imdbID).length == 0) {
//                         $('#rss').append(mapper(movie));
//                     }
//
//                     var color = (item.computed.size > 1 && item.computed.size < 2) ? 'green' : 'red';
//
//                     // append magnet
//                     magnet(o.imdbID,item.guid,item.link,color);
//
//                     // store
//                     store.set('movie.' + o.imdbID, movie);
//                 },
//                 e => {
//                     console.log('ERROR: ' + item.ptn.title + ' | ' + item.guid );
//                 }
//             );
//         }
//     }
//
//     store.set('rss.items', items );
//
// }
