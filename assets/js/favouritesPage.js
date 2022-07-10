// creating necessary variables
const favBtnArea = document.querySelector('.favourites-btns');
const movieFavBtn = document.querySelector('#movie-btn')
const musicFavBtn = document.querySelector('#music-btn')
const favoritesCardsSection = document.querySelector('.favourites-cards-section');
let favPageMovieCards;
let favPageAlbumCards;



// modal variables
var modalPoster = document.querySelector('.modal-poster');

// modal variables for movies
var modalMovieTitle = document.querySelector('.modal-movie-title');
var modalMovieRating = document.querySelector('.modal-movie-rating');
var modalMovieReleaseDate = document.querySelector('.modal-release-date');
var modalMovieDescription = document.querySelector('.modal-description');

// modal variables for albums
var modalAlbumTitle = document.querySelector('.modal-album-title');
var modalAlbumArtist = document.querySelector('.modal-album-artist');
var modalAlbumReleaseDate = document.querySelector('.modal-album-release-date');
var modalAlbumStyle = document.querySelector('.modal-album-style');
var modalAlbumGenre = document.querySelector('.modal-album-genre');
var modalAlbumScore = document.querySelector('.modal-album-score');






// extract local storage variables
let localStorageVariables = {...localStorage};

let localStorageValues = Object.values(localStorageVariables);



// when the page first loads up, load all the favourite movies, just hide them and only unhide them when you press the relevant button
let movieLocalVariables = [];

// loop over local storage variables
localStorageValues.forEach(function(urlString) {

    // if local storage value includes 'https://api.themoviedb.org', push it into movieLocalVariables array
    if(urlString.includes('https://api.themoviedb.org')) {
        movieLocalVariables.push(urlString);
    }

})



// create a card for each of the movie urls
movieLocalVariables.forEach(function(urlString, i) {

    // create fetch call
    fetch(urlString)
    .then(response => response.json())
    .then(data => {
        console.log(data)

        // create HTML element for each movie card
        favoritesCardsSection.insertAdjacentHTML('beforeend', `
            <div class="swiper-slide fav-page-movie-card hide " data-objectid="${data.id}">
                <img class="star fav star-movie-number-${i}" src="./assets/images/star-filled.png"/>

                <div data-target="modal1" class="modal-trigger movie-card-${i}">
                    <p class="movie-name">${data.original_title}</p>

                    <img class="poster" src="https://image.tmdb.org/t/p/w500${data.poster_path}"/>

                    <p class="rating-circle ${Number(data.vote_average).toFixed(1) >= 7.5 ? "green" : Number(data.vote_average).toFixed(1) >= 5 ? "orange" : "red"}">${data.vote_average.toFixed(1)}</p>
                </div>
            </div>
        `)

        // define node list of all movie cards on this page
        favPageMovieCards = document.querySelectorAll('.fav-page-movie-card')



        // add event listeners to each star element
        let starElementForCurrentIteration = document.querySelector(`.star-movie-number-${i}`);

        starElementForCurrentIteration.addEventListener('click', function() {
            
            // define variable for the current iteration's star element's movie card element
            let currentCard = starElementForCurrentIteration.closest('.fav-page-movie-card');

            if(starElementForCurrentIteration.classList.contains('fav')) {
                // if star element contains 'fav' class, do the following

                // remove 'fav' class
                starElementForCurrentIteration.classList.remove('fav');

                // change star to be outline of yellow only
                starElementForCurrentIteration.src = "./assets/images/star.png"

                // remove the relevant item from local storage
                window.localStorage.removeItem(`${currentCard.dataset.objectid}`)
            } else {
                // if star element doesn't contain 'fav' class, do the following

                // add 'fav' class
                starElementForCurrentIteration.classList.add('fav')

                // change star to be filled with yellow
                starElementForCurrentIteration.src = "./assets/images/star-filled.png"

                // add the relevant item to local storage
                window.localStorage.setItem(`${currentCard.dataset.objectid}`, `https://api.themoviedb.org/3/movie/${currentCard.dataset.objectid}?api_key=128647a13ca5ba337586e1fc48e4cbf6`)
            }

        })



        // adding modal functionality (outsourced to modal.js)
        $('document').ready(function() {
            $('.modal').modal()
        })

        // select current iteration's movie card
        const currentIterationMovieCard = document.querySelector(`.movie-card-${i}`)

        // render modal
        dynamicallyRenderModal(currentIterationMovieCard, data, true)

    })

})





// when the page first loads up, load all the favourite albums, just hide them and only unhide them when you press the relevant button
let musicLocalVariables = [];

// loop over local storage variables
localStorageValues.forEach(function(urlString) {

    // if local storage value includes 'https://www.theaudiodb.com', push it into musicLocalVariables array
    if(urlString.includes('https://www.theaudiodb.com')) {
        musicLocalVariables.push(urlString);
    }

})



// create a card for each of the movie urls
musicLocalVariables.forEach(function(urlString, i) {

    // create fetch call
    fetch(urlString)
    .then(response => response.json())
    .then(data => {
        console.log(data)

        // create HTML element for each album card
        favoritesCardsSection.insertAdjacentHTML('beforeend', `
            <div class="swiper-slide fav-page-album-card hide" data-artist="${data.album[0].strArtist}" data-album="${data.album[0].strAlbum}">
                <img class="star fav star-album-number-${i}" src="./assets/images/star-filled.png"/>


                <div data-target="modal1" class="modal-trigger album-card-${i}">
                    <p class="album-name">${data.album[0].strAlbum}</p>
                    <img class="poster" src="${data.album[0].strAlbumThumb}"/>
                    <p class="rating-circle ${Number(data.album[0].intScore).toFixed(1) >= 7.5 ? "green" : Number(data.album[0].intScore).toFixed(1) >= 5 ? "orange" : "red"}">${Number(data.album[0].intScore).toFixed(1)}</p>
                </div>
                
            </div>
        `
        )

        // define node list of all album cards on this page
        favPageAlbumCards = document.querySelectorAll('.fav-page-album-card');



        // these are the dataset values for the current Card
        let artistName = data.album[0].strArtist;
        let albumName = data.album[0].strAlbum;

        // the artist name can be one word, which works out well in the code, but it could also be multiple words, so, we need to check if it includes a ' ', and then replace that with an underscore
        if(artistName.includes(' ')) {
            artistName = artistName.replaceAll(' ', '_');
        }

        // the album name can be one word, which works out well in the code, but it could also be multiple words, so, we need to check if it includes a ' ', and then replace that with an underscore
        if(albumName.includes(' ')) {
            albumName = albumName.replaceAll(' ', '_');
        }



        // add event listeners to each star element
        let starElementForCurrentIteration = document.querySelector(`.star-album-number-${i}`)

        starElementForCurrentIteration.addEventListener('click', function() {

            // define variable for the current iteration's star element's album card element
            let currentCard = starElementForCurrentIteration.closest('.fav-page-album-card');

            if(starElementForCurrentIteration.classList.contains('fav')) {
                // if star element contains 'fav' class, do the following

                // remove 'fav' class
                starElementForCurrentIteration.classList.remove('fav');
                
                // change star to be outline of yellow only
                starElementForCurrentIteration.src = "./assets/images/star.png"
                
                // remove the relevant item from local storage
                window.localStorage.removeItem(`9album9-${artistName}-${albumName}`)
            } else {
                // if star element doesn't contain 'fav' class, do the following

                // add 'fav' class
                starElementForCurrentIteration.classList.add('fav')
                
                // change star to be filled with yellow
                starElementForCurrentIteration.src = "./assets/images/star-filled.png"
                
                // add the relevant item to local storage
                window.localStorage.setItem(`9album9-${artistName}-${albumName}`, `https://www.theaudiodb.com/api/v1/json/523532/searchalbum.php?s=${artistName}&a=${albumName}`)
            }
                
        })



        // adding modal functionality (outsourced to modal.js)
        $('document').ready(function() {
            $('.modal').modal()
        })

        // select current iteration's album card
        const currentIterationAlbumCard = document.querySelector(`.album-card-${i}`)

        // render modal
        dynamicallyRenderModal(currentIterationAlbumCard, data.album[0], false)

    })

})





// adding event listeners to the buttons at the top of the page (using event delegation)
favBtnArea.addEventListener('click', function(e) {
    
    // if click event occured at movie btn
    if(e.target === movieFavBtn) {
        
        // hide all the movie cards
        favPageMovieCards.forEach(function(element) {
            element.classList.toggle('hide');
        })   

    }

    // if click event occured at music btn
    if(e.target === musicFavBtn) {
        
        // hide all the album cards
        favPageAlbumCards.forEach(function(element) {
            element.classList.toggle('hide');
        })

    }

})