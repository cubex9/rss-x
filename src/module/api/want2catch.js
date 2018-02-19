'use strict'

/**
 * All instances of WantAndCatch, use only one queue.
 */
const globalQ = {}

/**
 * This is espetzial queue, you put what you want and
 * que callback you even one is catch.
 */
class WantAndCatch {
    /**
     * If you want something, put the key and callback
     * @param {*} key
     * @param callback ((val) => .. )
     */
    want (key, callback) {
        if (globalQ[key] == null) {
            globalQ[key] = callback
        } else {
            return globalQ
        }
    }

    /**
     * When is something ok, catch it.
     * @param {*} key
     * @param {*} val
     */
    catch (key, val) {
        if (globalQ[key] != null) {
            const t = globalQ[key]
            t.callbacks.map(t.value)
        }
    }
}

module.exports = WantAndCatch
