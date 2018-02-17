/**
 * Base of all data classes -> type and id
 */
class DApi {
    constructor (serialized) {
        this.__db = null
    }

    get type () {
        throw Error('Type must be overriden, know types: movie, item, channel, user, event')
    }

    get id () {
        throw Error('Id must be overriden')
    }

    /**
     * when object is chnage, can be updated
     * @param dapi
     */
    update (data) {
        this.__db.update(this, data)
    }
}

module.exports = DApi
