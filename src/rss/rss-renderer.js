module.exports = function (m) {
    return `<div class="movie-item" id="${m.omdb.imdbID}">
                <div class="movie-poster">
                    <img src="${m.omdb.Poster}" width="160pt" border="8pt solid black" />
                </div> 
                <div class="movie-pack">
                    <div class="movie-title-line">
                        <div class="movie-title">${m.omdb.Title} ( ${m.omdb.Year} ) </div>
                        <div class="movie-downloads">                        
                        </div>
                    </div>
                    <div class="movie-plot">${m.omdb.Plot}</div>
                    <div class="movie-ratting-imdb">${m.omdb.imdbRating}</div>
                </div>
            </div>`
}

// <a href="magnet:?dn=${item.magnet}" class="movie-link">
//     <img src="pic/download.png" width="24pt" />
// </a>
