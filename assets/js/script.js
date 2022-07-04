
// slider options
let swiper = new Swiper(".mySwiper", {
    slidesPerView: 5, // how many images can you see in the viewport at once in the carousel
    spaceBetween: 20, // in pixels

    // this is to make the arrow buttons scroll by however many images you want
    // slidesPerGroup: 2,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});




// creating variables for the relevant HTML elements
const swiperWrapper = document.querySelector('.swiper-wrapper');




// creating a function for fetching the "popular" category of movie data
// https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=c8cf92bd2fc318d87a9c7a2c7e328161

const fetchPopularMovies = function() {
    fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=c8cf92bd2fc318d87a9c7a2c7e328161`)
    .then(responce => responce.json())
    .then(data => {
        console.log(data)

        data.results.forEach(function(element, i) {

            swiperWrapper.insertAdjacentHTML('beforeend', 
            `<!-- slide ${i+1} -->
            <div class="swiper-slide" id=${i}>

                <img class="star" src="./assets/images/star.png"/>

                <p class="movie-name">${element.original_title}</p>

                <img class="poster" src="https://image.tmdb.org/t/p/w500${element.poster_path}"/>
                
            </div>`
            )

            console.log(element.original_title)
        })


    })


}

fetchPopularMovies();