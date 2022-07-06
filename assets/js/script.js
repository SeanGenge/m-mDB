
// creating variables for the relevant HTML elements in homepage.
const swiperWrapperMovies = document.querySelector('#swiper-wrapper-movies');
const swiperWrapperSongs = document.querySelector('#swiper-wrapper-songs');
let allCards;
let starElements;
let favouritesArrayURLS = [];








// most popular movies section

// creating a function for fetching the "popular" category of movie data
const fetchPopularMovies = function() {
    fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=` + apiKey)
    .then(responce => responce.json())
    .then(data => {
        console.log(data)
        
        data.results.forEach(function(element, i) {
            swiperWrapperMovies.insertAdjacentHTML('beforeend', 
            `<!-- slide ${i+1} -->` + getMovieCardHTML(element, i, true)
            )
        })

        addFavOnLoad();
        addStarEventListeners();
    })
}

fetchPopularMovies();



// slider options for Popular movies carousel
let movieSwiper = new Swiper(".mySwiper", {

    // these are the DEFAULT settings
    slidesPerView: 1, // how many images can you see in the viewport at once in the carousel
    spaceBetween: 20, // in pixels
    slidesPerGroup: 1, // one click of the arrow buttons will move the slides by 5 positions

    // make carousel responsive
    breakpoints: {
        // when window width is >= 1360px
        1360: {
         slidesPerView: 5,
         slidesPerGroup: 1,
         spaceBetween: 20
        },
        // when window width is >= 1100px
        1110: {
         slidesPerView: 4,
         slidesPerGroup: 1,
         spaceBetween: 20
        },
        // when window width is >= 850px
        850: {
         slidesPerView: 3,
         slidesPerGroup: 1,
         spaceBetween: 20
        },
        // when window width is >= 600px
        600: {
            slidesPerView: 2,
            slidesPerGroup: 1,
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

let popularAlbumsArray20 = [];
let starSongElements;
let allAlbumCards;


// fetching album data from audioDB
fetch('https://theaudiodb.com/api/v1/json/523532/mostloved.php?format=album')
.then(responce => responce.json())
.then(data => {

    console.log(data);

    data.loved.forEach(function(object, i) {
        // extract the first 20 popular albums, no need for all 50
        if(i <= 19) {
            popularAlbumsArray20.push(object);
        }

    })

    popularAlbumsArray20.forEach(function(object, i) {

            swiperWrapperSongs.insertAdjacentHTML('beforeend', 
                `<div class="swiper-slide swiper-slide-album" data-artist="${object.strArtist}" data-album="${object.strAlbum}">
                    <img class="star-song" src="./assets/images/star.png"/>
                    <p class="song-name">${object.strAlbum}</p>
                    <img class="poster" src="${object.strAlbumThumb}"/>
                    <p class="rating-circle">${Number(object.intScore).toFixed(1)}</p>
                </div>`
            )


    })





    // add the 'fav' class to all the cards that have their id stored in local storage
    allAlbumCards = document.querySelectorAll('.swiper-slide-album');

    let allLocalStorageVariables = {...localStorage};

    // filter out the movie variables and create object with only album variables
    let arrayOfLocalStorageValues = Object.keys(allLocalStorageVariables);
    
    let localStorageAlbumsOnly = [];

    arrayOfLocalStorageValues.forEach(function(key) {

        if(key.includes('9album9')) {
            localStorageAlbumsOnly.push(key)
        }

    })


    let artistNameString;
    let albumNameString;


    localStorageAlbumsOnly.forEach(function(string) {


        artistNameString = string.split('-')[1];
        albumNameString = string.split('-')[2];

        allAlbumCards.forEach(function(card) {

            let noSpacesArtist = card.dataset.artist;
            let noSpacesAlbum = card.dataset.album;


            if(noSpacesArtist.includes(' ')) {
                noSpacesArtist = noSpacesArtist.replaceAll(' ', '_');
            }

            

            if(noSpacesAlbum.includes(' ')) {
                noSpacesAlbum = noSpacesAlbum.replaceAll(' ', '_');
            }

           

            if((noSpacesArtist === artistNameString) && (noSpacesAlbum === albumNameString)) {
                card.children[0].classList.add('fav-song')
                card.children[0].src = "./assets/images/star-filled.png";
            }
        })





    })


















    // add event listener to all star elements for SONGS
    starSongElements = document.querySelectorAll('.star-song');
    
    starSongElements.forEach(function(element) {

        element.addEventListener('click', function() {
            element.classList.toggle('fav-song');
            console.log('clicked!');

            let currentSongCard = element.closest('.swiper-slide');

            let artistName = currentSongCard.dataset.artist;
            let albumName = currentSongCard.dataset.album;



            // manipulating artist and album string
            if(artistName.includes(' ')) {
                artistName = artistName.replaceAll(' ', '_');
            }

            if(albumName.includes(' ')) {
                albumName = albumName.replaceAll(' ', '_');
            }

            if(element.classList.contains('fav-song')) {
                window.localStorage.setItem(`9album9-${artistName}-${albumName}`, `https://www.theaudiodb.com/api/v1/json/523532/searchalbum.php?s=${artistName}&a=${albumName}`)
                element.src = "./assets/images/star-filled.png";
            } else {
                window.localStorage.removeItem(`9album9-${artistName}-${albumName}`)
                element.src = "./assets/images/star.png";
            }

        })

    })

    


})































// slider options for popular songs

let songSwiper = new Swiper(".mySwiper2", {

    // these are the DEFAULT settings
    slidesPerView: 1, // how many images can you see in the viewport at once in the carousel
    spaceBetween: 20, // in pixels
    slidesPerGroup: 1, // one click of the arrow buttons will move the slides by 5 positions

    // make carousel responsive
    breakpoints: {
        // when window width is >= 1360px
        1360: {
         slidesPerView: 5,
         slidesPerGroup: 1,
         spaceBetween: 20
        },
        // when window width is >= 1100px
        1110: {
         slidesPerView: 4,
         slidesPerGroup: 1,
         spaceBetween: 20
        },
        // when window width is >= 850px
        850: {
         slidesPerView: 3,
         slidesPerGroup: 1,
         spaceBetween: 20
        },
        // when window width is >= 600px
        600: {
            slidesPerView: 2,
            slidesPerGroup: 1,
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




