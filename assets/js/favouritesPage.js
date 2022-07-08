// creating necessary variables
const favBtnArea = document.querySelector('.favourites-btns');
const movieFavBtn = document.querySelector('#movie-btn')
const musicFavBtn = document.querySelector('#music-btn')



// event delegation
favBtnArea.addEventListener('click', function(e) {
    
    // if click event occured at movie btn
    if(e.target === movieFavBtn) {
        console.log('clicked movie btn')
    }



    // if click event occured at music btn
    if(e.target === musicFavBtn) {
        console.log('clicked music btn')
    }


})