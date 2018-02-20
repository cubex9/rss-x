const Resolver = require('./api/resolver.js')
const EttvItem = require('./data/EttvItem.js')

/**
 * Resolving specialites of ETTV channel
 * @author kubasekA
 */
class EttvResolver extends Resolver {
    constructor ({conf, wac, onInsertMovie, onInsertItem, onError}) {
        super({conf, wac, onInsertMovie, onInsertItem, onError})
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

module.exports = EttvResolver
