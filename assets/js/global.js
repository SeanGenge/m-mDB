const apiKey = "128647a13ca5ba337586e1fc48e4cbf6";

function getMovieCardHTML(movieDetails, index, inCarousel) {
    return `
        <div class=${inCarousel ? "swiper-slide" : "mc"} id=${index} data-objectid="${movieDetails.id}">
            <img class="star" src="./assets/images/star.png"/>
            <p class="movie-name">${movieDetails.original_title}</p>
            <img class="poster" src="https://image.tmdb.org/t/p/w500${movieDetails.poster_path}"/>
            <p class="rating-circle">${movieDetails.vote_average.toFixed(1)}</p>
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

function addFavOnLoad() {
    // add the 'fav' class to all the cards that have their id stored in local storage
    allCards = document.querySelectorAll('.swiper-slide');
    
    if (!allCards.length) {
        allCards = document.querySelectorAll(".mc");
    }

    let localStorageVariables = {...localStorage};

    let arrayOfLocalStorageKeys = Object.keys(localStorageVariables);
    console.log(arrayOfLocalStorageKeys);
    allCards.forEach(function(card) {

        if(arrayOfLocalStorageKeys.includes(card.dataset.objectid)) {
            card.children[0].classList.add('fav');
            card.children[0].src = "./assets/images/star-filled.png";
        }
    })
}