'use strict'

const Rndr = require('./api/renderer.js')

class HtmlRndr extends Rndr {
    constructor (cc) {
        super(cc)
        this.container = cc
        console.log('renderer:', this.container)
    }

    add (m) {
        console.log('Render ->', this.container, m)
        window.$(this.container).append(
            `<div class="movie-item" id="${m.id}">
                <div class="movie-poster">
                    <img src="${m.poster}" width="160pt" border="8pt solid black" />
                </div> 
                <div class="movie-pack">
                    <div class="movie-title-line">
                        <div class="movie-title">${m.title} ( ${m.year} ) </div>
                        <div class="movie-downloads">                        
                        </div>
                    </div>
                    <div class="movie-plot">${m.plot}</div>
                    <div class="movie-ratting-imdb">${m.ratting}</div>
                </div>
            </div>`
        )
    }

    update (m, i) {
    }

    error (e) {
    }
}

module.exports = HtmlRndr
