const apiKey = "128647a13ca5ba337586e1fc48e4cbf6";
const musicApiKey = "523532";

function getMovieCardHTML(movieDetails, index, inCarousel) {
    return `
        <div class=${inCarousel ? "swiper-slide" : "mc"} id=${index} data-objectid="${movieDetails.id}">
            <img class="star" src="./assets/images/star.png"/>
            <p class="movie-name">${movieDetails.original_title}</p>
            <img class="poster" src="https://image.tmdb.org/t/p/w500${movieDetails.poster_path}"/>
            <p class="rating-circle">${movieDetails.vote_average.toFixed(1)}</p>
        </div>`
}

function getMusicCardHTML(musicDetails, index) {
    return `
        <div class="mc" id=${index} data-artist="${musicDetails.strArtist}" data-album="${musicDetails.strAlbum}">
            <img class="star" src="./assets/images/star.png"/>
            <p class="movie-name">${musicDetails.strAlbumStripped}</p>
            <img class="poster" src="${musicDetails.strAlbumThumb}"/>
            <p class="rating-circle">${Number(musicDetails.intScore).toFixed(1)}</p>
        </div>`
}

function addStarEventListeners() {
    starElements = document.querySelectorAll('.star');

        // add event listener to each of the star elements
        starElements.forEach(function(element) {
            element.addEventListener('click', function() {
                element.classList.toggle('fav')
                console.log('clicked!')
                let currentCard = element.closest('.swiper-slide');
                
                if (currentCard === null) {
                    currentCard = element.closest(".mc");
                }
                
                if(element.classList.contains('fav')) {
                    window.localStorage.setItem(`${currentCard.dataset.objectid}`, `https://api.themoviedb.org/3/movie/${currentCard.dataset.objectid}?api_key=` + apiKey);
                    element.src = "./assets/images/star-filled.png";
                } else {
                    window.localStorage.removeItem(`${currentCard.dataset.objectid}`);
                    element.src = "./assets/images/star.png";
                }
            })
        })
}

function addStarEventListeners() {
    starElements = document.querySelectorAll('.star');

        // add event listener to each of the star elements
        starElements.forEach(function(element) {
            element.addEventListener('click', function() {
                element.classList.toggle('fav')
                console.log('clicked!')
                let currentCard = element.closest('.swiper-slide');
                
                if (currentCard === null) {
                    currentCard = element.closest(".mc");
                }
                
                var qParams = readQueryString();
                
                if(element.classList.contains('fav')) {
                    if (qParams[1][1] === movieSearchTxt) {
                        window.localStorage.setItem(`${currentCard.dataset.objectid}`, `https://api.themoviedb.org/3/movie/${currentCard.dataset.objectid}?api_key=` + apiKey);
                    }
                    else if (qParams[1][1] === musicSearchTxt) {
                        // these are the dataset values for the slide that has the star that's just been clicked
                        let artistName = currentCard.dataset.artist;
                        let albumName = currentCard.dataset.album;

                        // the artist name can be one word, which works out well in the code, but it could also be multiple words, so, we need to check if it includes a ' ', and then replace that with an underscore
                        if(artistName.includes(' ')) {
                            artistName = artistName.replaceAll(' ', '_');
                        }

                        // the album name can be one word, which works out well in the code, but it could also be multiple words, so, we need to check if it includes a ' ', and then replace that with an underscore
                        if(albumName.includes(' ')) {
                            albumName = albumName.replaceAll(' ', '_');
                        }
            
                        window.localStorage.setItem(`9album9-${artistName}-${albumName}`, `https://www.theaudiodb.com/api/v1/json/523532/searchalbum.php?s=${artistName}&a=${albumName}`);
                    }
                    
                    element.src = "./assets/images/star-filled.png";
                } else {
                    if (qParams[1][1] === movieSearchTxt) {
                        window.localStorage.removeItem(`${currentCard.dataset.objectid}`);
                    }
                    else if (qParams[1][1] === musicSearchTxt) {
                        // these are the dataset values for the slide that has the star that's just been clicked
                        let artistName = currentCard.dataset.artist;
                        let albumName = currentCard.dataset.album;

                        // the artist name can be one word, which works out well in the code, but it could also be multiple words, so, we need to check if it includes a ' ', and then replace that with an underscore
                        if(artistName.includes(' ')) {
                            artistName = artistName.replaceAll(' ', '_');
                        }

                        // the album name can be one word, which works out well in the code, but it could also be multiple words, so, we need to check if it includes a ' ', and then replace that with an underscore
                        if(albumName.includes(' ')) {
                            albumName = albumName.replaceAll(' ', '_');
                        }
            
                        window.localStorage.removeItem(`9album9-${artistName}-${albumName}`)
                    }
                    
                    element.src = "./assets/images/star.png";
                }
            })
        })
}

function addFavOnLoad() {
    // add the 'fav' class to all the cards that have their id stored in local storage
    allCards = document.querySelectorAll('.swiper-slide');
    
    if (!allCards.length) {
        allCards = document.querySelectorAll(".mc");
    }

    let localStorageVariables = {...localStorage};

    let arrayOfLocalStorageKeys = Object.keys(localStorageVariables);
    
    allCards.forEach(function(card) {
        var qParams = readQueryString();
        
        if (qParams[1][1] === movieSearchTxt) {
            if(arrayOfLocalStorageKeys.includes(card.dataset.objectid)) {
                card.children[0].classList.add('fav');
                card.children[0].src = "./assets/images/star-filled.png";
            }
        }
        else if (qParams[1][1] === musicSearchTxt) {
            var key = "9album9-" + card.dataset.artist.replaceAll(" ", "_") + "-" + card.dataset.album.replaceAll(" ", "_");
            if(arrayOfLocalStorageKeys.includes(key)) {
                card.children[0].classList.add('fav');
                card.children[0].src = "./assets/images/star-filled.png";
            }
        }
    })
}

function readQueryString() {
    // Returns the params from the query string
    var queryString = document.location.search.substring(1);
    var vars = queryString.split('&');
    var params = [];
    
    for (var i = 0; i < vars.length; i++) {
        var param = vars[i].split('=');
        
        if (param[0] === "search") {
            param[1] = param[1];
        }
        else if (param[0] === "term") {
            param[1] = param[1].replaceAll("%20", " ");
        }
        
        params.push(param);
    }
    
    return params;
}