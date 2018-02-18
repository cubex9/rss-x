/**
 * Base of all data classes -> type and id
 */
class DApi {
    constructor (serialized) {
        this.type = null
    }

    get id () {
        throw Error('Id must be overriden')
    }
}

module.exports = DApi
