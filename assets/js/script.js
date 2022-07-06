
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

let popularAlbumsArray20 = [];
let starSongElements;


// fetching song data from audioDB
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
                `<div class="swiper-slide" data-objectid="${object.idAlbum}">
                    <img class="star-song" src="./assets/images/star.png"/>
                    <p class="song-name">${object.strAlbum}</p>
                    <img class="poster" src="${object.strAlbumThumb}"/>
                    <p class="rating-circle">${Number(object.intScore).toFixed(1)}</p>
                </div>`
            )


    })





    
    // add event listener to all star elements for SONGS
    starSongElements = document.querySelectorAll('.star-song');
    
    starSongElements.forEach(function(element) {

        element.addEventListener('click', function() {
            element.classList.toggle('fav-song');
            console.log('clicked!');

            let currentSongCard = element.closest('.swiper-slide');

            if(element.classList.contains('fav-song')) {
                // window.localStorage.setItem(`song-${currentSongCard}`)
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




