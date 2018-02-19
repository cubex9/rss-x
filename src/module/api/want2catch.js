'use strict'

/**
 * One Q object
*/
class QData {
    constructor () {
        this.calls = []
        this.err = null
        this.result = null
    }

    /**
     * Add next object waiting for the same key
     * @param {} o data object
     */
    add (o) {
        this.calls.push(o)
        return this
    }

    /**
     * results
     */
    result (err, result) {
        this.err = err
        this.result = result
    }

    hasResult () {
        return this.result != null
    }

    call (f) {
        return f(this.err, this.result)
    }
    /**
     * call callback over all dataz
     * @param {*} callback method for mapping
     * @return array of results
     */
    calls () {
        const r = this.calls.map((f) => f(this.err, this.result))
        this.calls = []

        return r
    }
}
/**
 * This is espetzial queue, you put what you want and
 * que callback you even one is catch.
 * @param callback method will be called when key is catch
 */
class WantAndCatch {
    constructor (key, call) {
        this.globlQ = {}
        this.call = call
        this.key = key
    }

    /**
     * If you want something, put the key and callback
     * @param {*} key
     * @param callback ((val) => .. )
     */
    want (t, callback) {
        const key = this.key(t)
        if (this.globalQ[key] == null) {
            // first call, make QCall object and put first callback
            this.globalQ[key] = new QData().add(callback)

            this.call(t, (e, r) => this.catch(key, e, r))
        } else if (this.globalQ[key].hasResult()) {
            // call is down
            this.globalQ[key].call(callback)
        } else {
            // call is in progress
            this.globalQ[key].add(callback)
        }
    }

    /**
     * When is something ok, catch it.
     * @param {*} key
     * @param {*} val
     */
    catch (key, err, result) {
        const g = this.globalQ[key]
        if (g != null) {
            g.result(err, result)
            g.callAndClean()
        } else {
            throw Error('No one call initilized')
        }
    }
}

module.exports = WantAndCatch

//
// const wac = new WantAndCatch((t) => t.title, omdb.get )
// wac.want(t,(e,r) => resolveMovie( Convertors.deserialize(r), t))
