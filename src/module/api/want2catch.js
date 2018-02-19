'use strict'

/**
 * One Q object
*/
class QData {
    constructor (resolver) {
        this.calls = []
        this.result = null
        this.resolver = resolver
    }

    /**
     * Add next object waiting for the same key
     * @param {} o data object
     */
    add (f) {
        this.calls.push(f)
        return this
    }

    hasResult () {
        return this.result != null
    }

    call (f) {
        if (this.result != null) {
            return f(this.result)
        }
        return null
    }

    resolve (result) {
        this.result = this.resolver(result)
    }

    /**
     * call callback over all dataz
     * @return array of results
     */
    process () {
        if (this.result != null) {
            const r = this.calls.map((f) => f(this.result))
            this.calls = []

            return r
        }
        return []
    }
}

/**
 * This is espetzial queue, you put what you want and
 * que callback you even one is catch.
 * @param key get the key from object
 * @param call method which will be called
 */
class WantAndCatch {
    constructor (key, call) {
        this.Q = new Map()

        /**
         * represents global call for data or something other
         */
        this.call = call

        /**
         * key method
         */
        this.key = key
    }

    /**
     * If you want something, put the key and callback
     * @param {*} key
     * @param callback ((val) => .. )
     */
    want (t, resolver, callback) {
        const key = this.key(t)
        const g = this.Q.get(key)

        if (g == null) {
            // first call, make QCall object and put first callback
            this.Q.set(key, new QData(resolver).add(callback))

            this.call(t, (r) => this.catch(key, r))
        } else if (g.hasResult()) {
            // call is down
            g.call(callback)
        } else {
            // call is in progress
            g.add(callback)
        }
    }

    /**
     * When is something ok, catch it.
     * @param {*} key
     * @param {*} val
     */
    catch (key, result) {
        const g = this.Q.get(key)
        if (g != null) {
            g.resolve(result)
            g.process()
        } else {
            throw Error('No one call initilized')
        }
    }
}

module.exports = WantAndCatch

//
// const wac = new WantAndCatch((t) => t.title, omdb.get )
// wac.want(t,(e,r) => resolveMovie( Convertors.deserialize(r), t))
