
// creating variables for the relevant HTML elements in homepage.
const swiperWrapper = document.querySelector('.swiper-wrapper');
let allCards;
let starElements;
let favouritesArrayURLS = [];







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
            <div class="swiper-slide" id=${i} data-objectid="${element.id}">

                <img class="star" src="./assets/images/star.png"/>

                <p class="movie-name">${element.original_title}</p>

                <img class="poster" src="https://image.tmdb.org/t/p/w500${element.poster_path}"/>

                <p class="rating-circle">${element.vote_average.toFixed(1)}</p>
                
            </div>`
            )

            
        })





        // add the 'fav' class to all the cards that have their id stored in local storage
        allCards = document.querySelectorAll('.swiper-slide');

        let localStorageVariables = {...localStorage};
        console.log(localStorageVariables)

        let arrayOfLocalStorageKeys = Object.keys(localStorageVariables);
        console.log(arrayOfLocalStorageKeys);


        allCards.forEach(function(element) {

            if(arrayOfLocalStorageKeys.includes(element.dataset.objectid)) {
                element.children[0].classList.add('fav')
            }

        })













        starElements=document.querySelectorAll('.star');

        // add event listener to each of the star elements
        starElements.forEach(function(element) {

            element.addEventListener('click', function() {

                element.classList.toggle('fav')
                console.log('clicked!')

                let currentCard = element.closest('.swiper-slide');


                if(element.classList.contains('fav')) {

                    window.localStorage.setItem(`${currentCard.dataset.objectid}`, `https://api.themoviedb.org/3/movie/${currentCard.dataset.objectid}?api_key=c8cf92bd2fc318d87a9c7a2c7e328161`)
                
                } else {
                    window.localStorage.removeItem(`${currentCard.dataset.objectid}`)
                }
                    

            })

        })


















    })


}

fetchPopularMovies();


// slider options
let swiper = new Swiper(".mySwiper", {
    slidesPerView: 5, // how many images can you see in the viewport at once in the carousel
    spaceBetween: 20, // in pixels
    slidesPerGroup: 5,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});



