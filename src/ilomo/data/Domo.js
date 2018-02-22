'use strict'

/**
 * Base of all database objects, it is practicali Domain object.
 * Domo have only one property, 'type' is class address.
 */
class Domo {
    constructor (serialized) {
        this.type = null
    }

    get id () {
        throw Error('Id must be overriden')
    }
}

module.exports = Domo
