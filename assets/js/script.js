



// most popular movies section

// creating necessary variables
const swiperWrapperMovies = document.querySelector('#swiper-wrapper-movies');
const swiperWrapperSongs = document.querySelector('#swiper-wrapper-songs');
let allCards;
let starElements;
let favouritesArrayURLS = [];

// creating a function for fetching the "popular" category of movie data
const fetchPopularMovies = function() {
    fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=` + apiKey)
    .then(responce => responce.json())
    .then(data => {
        console.log(data)
        
        data.results.forEach(function(element, i) {
            swiperWrapperMovies.insertAdjacentHTML('beforeend', 
            `<div data-target="modal1" class="modal-trigger swiper-slide movie-carousel-slide" id=${i} data-objectid="${element.id}">
                <img class="star star-movie-carousel" src="./assets/images/star.png"/>
                <p class="movie-name">${element.original_title}</p>

                <img class="poster" src="https://image.tmdb.org/t/p/w500${element.poster_path}"/>
                <p class="rating-circle ${Number(element.vote_average).toFixed(1) >= 7.5 ? "green" : Number(element.vote_average).toFixed(1) >= 5 ? "orange" : "red"}">${element.vote_average.toFixed(1)}</p>
            </div>`
            )
        })



        // add the 'fav' class to all the cards in the movie carousel that have their id stored in local storage
        allCards = document.querySelectorAll('.swiper-slide');

        let localStorageVariables = {...localStorage};

        let arrayOfLocalStorageKeys = Object.keys(localStorageVariables);

        allCards.forEach(function(card) {

            if(arrayOfLocalStorageKeys.includes(card.dataset.objectid)) {
                card.children[0].classList.add('fav');
                card.children[0].src = "./assets/images/star-filled.png";
            } 

        })



        // add event listener to all stars in movie carousel
        starElements = document.querySelectorAll('.star-movie-carousel');

        starElements.forEach(function(element) {
            
            element.addEventListener('click', function() {
                element.classList.toggle('fav')
                
                let currentCard = element.closest('.swiper-slide');
                
                if(element.classList.contains('fav')) {
                    window.localStorage.setItem(`${currentCard.dataset.objectid}`, `https://api.themoviedb.org/3/movie/${currentCard.dataset.objectid}?api_key=` + apiKey);
                    element.src = "./assets/images/star-filled.png";
                } else {
                    window.localStorage.removeItem(`${currentCard.dataset.objectid}`);
                    element.src = "./assets/images/star.png";
                }
                    
            })

        })


        // add event listener to each card (outsource this completely to another file when you're done)
        $('document').ready(function() {
            $('.modal').modal()
        })

        // variable for movie and album image
        let modalPoster = document.querySelector('.modal-poster');

        // variables for movies
        let modalMovieTitle = document.querySelector('.modal-movie-title');
        let modalMovieRating = document.querySelector('.modal-movie-rating');
        let modalMovieReleaseDate = document.querySelector('.modal-release-date');
        let modalMovieDescription = document.querySelector('.modal-description');

        // variables for albums
        let modalAlbumTitle = document.querySelector('.modal-album-title')
        let modalAlbumArtist = document.querySelector('.modal-album-artist');
        let modalAlbumReleaseDate = document.querySelector('.modal-album-release-date');
        let modalAlbumStyle = document.querySelector('.modal-album-style');
        let modalAlbumGenre = document.querySelector('.modal-album-genre')
        let modalAlbumDescription = document.querySelector('.movie-album-description');
        let modalAlbumScore = document.querySelector('.modal-album-score');



        allCards.forEach(function(card, i) {
            card.addEventListener('click', function(e) {
                console.log(data.results[i]);

                // turn off album info
                modalAlbumTitle = ``;
                modalAlbumArtist = ``;
                modalAlbumReleaseDate = ``;
                modalAlbumStyle = ``;
                modalAlbumGenre = ``;
                modalAlbumDescription = ``;
                modalAlbumScore = ``;

                // change image dynamically
                modalPoster.src = `https://image.tmdb.org/t/p/w500${data.results[i].poster_path}`

                // change movie info dynamically
                modalMovieTitle.textContent = `${data.results[i].original_title}`

                modalMovieRating.textContent = `Rating: ${data.results[i].vote_average}`

                modalMovieReleaseDate.textContent = `Release Date: ${data.results[i].release_date}`

                modalMovieDescription.textContent = `Description: ${data.results[i].overview}`

            })
        })







    })

}

fetchPopularMovies();

// slider options for Popular movies carousel
let movieSwiper = new Swiper(".mySwiper", {

    // these are the DEFAULT settings
    slidesPerView: 1, // how many images can you see in the viewport at once in the carousel
    spaceBetween: 20, // in pixels
    slidesPerGroup: 1, // one click of the arrow buttons will move the slides by 1 position

    // make carousel responsive
    breakpoints: {
        // when window width is >= 1360px
        1360: {
         slidesPerView: 5,
         slidesPerGroup: 5,
         spaceBetween: 20
        },
        // when window width is >= 1100px
        1110: {
         slidesPerView: 4,
         slidesPerGroup: 4,
         spaceBetween: 20
        },
        // when window width is >= 850px
        850: {
         slidesPerView: 3,
         slidesPerGroup: 3,
         spaceBetween: 20
        },
        // when window width is >= 600px
        600: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 20
        },
        // when window width is >= 10px
        10: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 20
        },
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});



// most popular songs section

// creating necessary variables
let popularAlbumsArray20 = [];
let starSongElements;
let allAlbumCards;

// fetching album data from audioDB
fetch('https://theaudiodb.com/api/v1/json/523532/mostloved.php?format=album')
.then(responce => responce.json())
.then(data => {

    console.log(data);

    // loop through all 50 albums from API call
    data.loved.forEach(function(object, i) {
        // extract the first 20 popular albums, no need for all 50, keep it consistent with movie carousel
        if(i <= 19) {
            popularAlbumsArray20.push(object);
        }

    })

    // for each of the 20 popular albums, create a card element in the slider
    popularAlbumsArray20.forEach(function(object, i) {

        swiperWrapperSongs.insertAdjacentHTML('beforeend', 
            `<div data-target="modal1" class="modal-trigger swiper-slide swiper-slide-album" data-artist="${object.strArtist}" data-album="${object.strAlbum}">
                <img class="star-song" src="./assets/images/star.png"/>
                <p class="album-name">${object.strAlbum}</p>
                <img class="poster" src="${object.strAlbumThumb}"/>
                <p class="rating-circle ${Number(object.intScore).toFixed(1) >= 7.5 ? "green" : Number(object.intScore).toFixed(1) >= 5 ? "orange" : "red"}">${Number(object.intScore).toFixed(1)}</p>
            </div>`
        )

    })



    // add the 'fav-song' class to all the cards that are stored in local storage
    allAlbumCards = document.querySelectorAll('.swiper-slide-album');

    // create an object to hold all key-value pairs in local storage
    let allLocalStorageVariables = {...localStorage};

    // create array of just the keys
    let arrayOfLocalStorageValues = Object.keys(allLocalStorageVariables);
    
    // create empty array that will store ONLY the album local storage variables
    let localStorageAlbumsOnly = [];

    // loop through the array of keys
    arrayOfLocalStorageValues.forEach(function(key) {

        // filter out the movie keys and create array with only album keys
        if(key.includes('9album9')) {
            localStorageAlbumsOnly.push(key)
        }

    })


    let artistNameString;
    let albumNameString;

    // loop through array of album keys
    localStorageAlbumsOnly.forEach(function(string) {

        // split album keys into artist name and album name
        artistNameString = string.split('-')[1];
        albumNameString = string.split('-')[2];

        // loop through all album cards displayed in the slider
        allAlbumCards.forEach(function(card) {

            // these are the dataset values for each card
            let noSpacesArtist = card.dataset.artist;
            let noSpacesAlbum = card.dataset.album;

            // the artist name can be one word, which works out well in the code, but it could also be multiple words, so, we need to check if it includes a ' ', and then replace that with an underscore
            if(noSpacesArtist.includes(' ')) {
                noSpacesArtist = noSpacesArtist.replaceAll(' ', '_');
            }

            // the album name can be one word, which works out well in the code, but it could also be multiple words, so, we need to check if it includes a ' ', and then replace that with an underscore
            if(noSpacesAlbum.includes(' ')) {
                noSpacesAlbum = noSpacesAlbum.replaceAll(' ', '_');
            }

            // for a particular card, if the artist dataset value matches the artist name in local storage, AND, the album dataset value matches the album name in local storage...
            // then add the 'fav-song' class to that card as soon as the page loads, and also make the star yellow and not just the outline of the star   
            if((noSpacesArtist === artistNameString) && (noSpacesAlbum === albumNameString)) {
                card.children[0].classList.add('fav-song')
                card.children[0].src = "./assets/images/star-filled.png";
            }

        })

    })



    // add event listener to all star elements for SONGS
    starSongElements = document.querySelectorAll('.star-song');
    
    // loop through song-star elements
    starSongElements.forEach(function(element) {

        // add event listener to each song-star element
        element.addEventListener('click', function() {
            // whenever song-star is clicked, toggle the 'fav-song' class
            element.classList.toggle('fav-song');

            // based off the clicked star, select it's corresponding slide/card
            let currentSongCard = element.closest('.swiper-slide');

            // these are the dataset values for the slide that has the star that's just been clicked
            let artistName = currentSongCard.dataset.artist;
            let albumName = currentSongCard.dataset.album;

            // the artist name can be one word, which works out well in the code, but it could also be multiple words, so, we need to check if it includes a ' ', and then replace that with an underscore
            if(artistName.includes(' ')) {
                artistName = artistName.replaceAll(' ', '_');
            }

            // the album name can be one word, which works out well in the code, but it could also be multiple words, so, we need to check if it includes a ' ', and then replace that with an underscore
            if(albumName.includes(' ')) {
                albumName = albumName.replaceAll(' ', '_');
            }

            if(element.classList.contains('fav-song')) {
                // if the star has the 'fav-song' class, create a variable in local storage for the card that the clicked star is on
                // also change the star to be filled with yellow 
                window.localStorage.setItem(`9album9-${artistName}-${albumName}`, `https://www.theaudiodb.com/api/v1/json/523532/searchalbum.php?s=${artistName}&a=${albumName}`)
                element.src = "./assets/images/star-filled.png";
            } else {
                // if the star doesn't have the 'fav-song' class, delete the variable in local storage
                // also change the star to be only outline of yellow (not filled) 
                window.localStorage.removeItem(`9album9-${artistName}-${albumName}`)
                element.src = "./assets/images/star.png";
            }

        })

    })


    // add event listener to each card (outsource this completely to another file when you're done)
    $('document').ready(function() {
        $('.modal').modal()
    })



    // variable for movie and album image
    let modalPoster = document.querySelector('.modal-poster');

    // variables for movies
    let modalMovieTitle = document.querySelector('.modal-movie-title');
    let modalMovieRating = document.querySelector('.modal-movie-rating');
    let modalMovieReleaseDate = document.querySelector('.modal-release-date');
    let modalMovieDescription = document.querySelector('.modal-description');

    // variables for albums
    let modalAlbumTitle = document.querySelector('.modal-album-title')
    let modalAlbumArtist = document.querySelector('.modal-album-artist');
    let modalAlbumReleaseDate = document.querySelector('.modal-album-release-date');
    let modalAlbumStyle = document.querySelector('.modal-album-style');
    let modalAlbumGenre = document.querySelector('.modal-album-genre')
    let modalAlbumDescription = document.querySelector('.movie-album-description');
    let modalAlbumScore = document.querySelector('.modal-album-score');
    


    allAlbumCards.forEach(function(card, i) {

        card.addEventListener('click', function(e) {
            console.log(data.loved[i])

            // turn off movie info
            modalMovieTitle.textContent = ``;
            modalMovieRating.textContent = ``;
            modalMovieReleaseDate.textContent = ``;
            modalMovieDescription.textContent = ``;


            // change image dynamically
            modalPoster.src = `${data.loved[i].strAlbumThumb}`;

            // change album info dynamically
            modalAlbumTitle.textContent = `Album Name: ${data.loved[i].strAlbum}`
            modalAlbumArtist.textContent = `Artist Name: ${data.loved[i].strArtist}`;
            modalAlbumReleaseDate.textContent = `Year Released: ${data.loved[i].intYearReleased}`;
            modalAlbumStyle.textContent = `Style: ${data.loved[i].strStyle}`;
            modalAlbumGenre.textContent = `Genre: ${data.loved[i].strGenre}`;
            modalAlbumDescription.textContent = `Description: ${data.loved[i].strDescription}`;
            modalAlbumScore.textContent = `Score: ${data.loved[i].intScore}`;

        })
    })

})





// slider options for popular songs
let songSwiper = new Swiper(".mySwiper2", {

    // these are the DEFAULT settings
    slidesPerView: 1, // how many images can you see in the viewport at once in the carousel
    spaceBetween: 20, // in pixels
    slidesPerGroup: 1, // one click of the arrow buttons will move the slides by 1 position

    // make carousel responsive
    breakpoints: {
        // when window width is >= 1360px
        1360: {
         slidesPerView: 5,
         slidesPerGroup: 5,
         spaceBetween: 20
        },
        // when window width is >= 1100px
        1110: {
         slidesPerView: 4,
         slidesPerGroup: 4,
         spaceBetween: 20
        },
        // when window width is >= 850px
        850: {
         slidesPerView: 3,
         slidesPerGroup: 3,
         spaceBetween: 20
        },
        // when window width is >= 600px
        600: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 20
        },
        // when window width is >= 10px
        10: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 20
        },
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});




