'use strict'

class Rndr {
    constructor (cc) {
        this.container = cc
        console.log('renderer:', this.container)
    }

    add (movie) {
    }

    update (movie, item) {
    }

    error (e) {
        console.log('Error: {}', e)
    }
}

module.exports = Rndr
