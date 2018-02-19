const Resolver = require('./api/resolver.js')
const PirateItem = require('./data/PirateItem.js')

/**
 * Resolving specialites of Pirate channel
 * @author kubasekA
 */
class PirateResolver extends Resolver {
    constructor ({conf, wac, onInsertMovie, onInsertItem, onError}) {
        super({conf, wac, onInsertMovie, onInsertItem, onError})
    }

    /**
     * converze source entity from RSS chanel to RssItem
     *
     * @param item
     */
    convert (item) {
        return PirateItem.fromRss(item)
    }
}

module.exports = PirateResolver
