/**
 * Base of all data classes -> type and id
 */
class DataApi {

    constructor(serialized) {
    }

    get type() {
        throw Error("Type must be overriden")
    }

    get id() {
        throw Error("Id must be overriden")
    }

    set id(val) {
        throw Error("Set Id must be overriden")
    }
}