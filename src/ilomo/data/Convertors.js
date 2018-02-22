'use strict'

const logger = require('@log4js-node/log4js-api').getLogger('rssx')

const Movie = require('./Movie.js')
const EttvItem = require('./EttvItem.js')
const PirateItem = require('./PirateItem.js')
const Channel = require('./RssChannel')

/**
 * Static methods for converting Data entries
*/
class Convertors {
    static deserialize (i) {
        if (i != null) {
            if (i.type === 'item') {
                return Convertors.deserializeItem(i)
            } else if (i.type === 'movie') {
                return new Movie(i)
            } else if (i.type === 'channel') {
                return new Channel(i)
            }
            logger.error('Convertor unknown type: {}', i.type)
        }
        return null
    }

    static deserializeItem (i) {
        if (i.channel === 'ettv') {
            return new EttvItem(i)
        } else if (i.channel === 'pirate') {
            return new PirateItem(i)
        }
        logger.error('Item convertor unknown channel: {}', i.channel)
        return null
    }
}

module.exports = Convertors
