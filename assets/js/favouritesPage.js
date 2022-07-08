// creating necessary variables
const favBtnArea = document.querySelector('.favourites-btns');
const movieFavBtn = document.querySelector('#movie-btn')
const musicFavBtn = document.querySelector('#music-btn')
const favoritesCardsSection = document.querySelector('.favourites-cards-section');
let favPageMovieCards;
let favPageAlbumCards;



// extract local storage variables
let localStorageVariables = {...localStorage};
console.log(localStorageVariables);

let localStorageValues = Object.values(localStorageVariables);
console.log(localStorageValues);



// when the page first loads up, load all the favourite movies, just hide them and only unhide them when you press the relevant button
let movieLocalVariables = [];

localStorageValues.forEach(function(urlString) {

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

        favoritesCardsSection.insertAdjacentHTML('beforeend', `
            <!-- slide ${i+1} -->
            <div class="swiper-slide fav-page-movie-card hide" data-objectid="${data.id}">
                <img class="star fav" src="./assets/images/star-filled.png"/>
                <p class="movie-name">${data.original_title}</p>
                <img class="poster" src="https://image.tmdb.org/t/p/w500${data.poster_path}"/>
                <p class="rating-circle ${Number(data.vote_average).toFixed(1) >= 7.5 ? "green" : Number(data.vote_average).toFixed(1) >= 5 ? "orange" : "red"}">${data.vote_average.toFixed(1)}</p>
            </div>
        `)

        favPageMovieCards = document.querySelectorAll('.fav-page-movie-card')

    })

})



// when the page first loads up, load all the favourite albums, just hide them and only unhide them when you press the relevant button
let musicLocalVariables = [];

localStorageValues.forEach(function(urlString) {

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

        favoritesCardsSection.insertAdjacentHTML('beforeend', `
            <!-- slide ${i+1} -->
            <div class="swiper-slide fav-page-album-card hide" data-objectid="${data.album[0].idAlbum}">
                <img class="star fav fav-song" src="./assets/images/star-filled.png"/>
                <p class="movie-name">${data.album[0].strAlbum}</p>
                <img class="poster" src="${data.album[0].strAlbumThumb}"/>
                <p class="rating-circle ${Number(data.album[0].intScore).toFixed(1) >= 7.5 ? "green" : Number(data.album[0].intScore).toFixed(1) >= 5 ? "orange" : "red"}">${Number(data.album[0].intScore).toFixed(1)}</p>
            </div>
        `)

        favPageAlbumCards = document.querySelectorAll('.fav-page-album-card');

    })

})



















// adding event listeners to the buttons at the top of the page (using event delegation)
favBtnArea.addEventListener('click', function(e) {
    
    // if click event occured at movie btn
    if(e.target === movieFavBtn) {
        
        favPageMovieCards.forEach(function(element) {
            element.classList.toggle('hide');
        })   

    }



    // if click event occured at music btn
    if(e.target === musicFavBtn) {
        
        favPageAlbumCards.forEach(function(element) {
            element.classList.toggle('hide');
        })


    }


})