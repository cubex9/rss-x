'use strict'

const Rndr = require('./api/renderer.js')
const magnetron = require('./magnet-link.js')
const toropa = require('parse-torrent')

class HtmlRndr extends Rndr {
    constructor (cc) {
        super(cc)
        this.container = cc
        console.log('renderer:', this.container)
    }

    add (m) {
        if (window.$('#' + m.id).length === 0) {
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
    }

    update (m, i) {
        magnetron(i.link, (p) => {
            window.$('#' + m.id + ' .movie-downloads').append(`
                <a href="${toropa.toMagnetURI(p)}" class="movie-link" id="${i.id}">
                    <img src="pic/download.png" width="24pt" />
                </a>
            `)
        })
        // window.$('#' + itemId).css('background-color', color)
    }

    error (e) {
    }
}

module.exports = HtmlRndr
