
// function to render modal for a particular card
const dynamicallyRenderModal = function(currentCard, objectFromAPI, trueForMovieFalseForAlbum) {

    // currentCard means the current div element that contains data-target="modal1" and class="modal-trigger". The reason this div element was added is because it is essential that the star element is not included inside the div that triggers the modal to pop up once it is clicked. Think about this, if the star is included inside this clickable div, whenever we click the star to add a card to our favourites, the modal will also pop up! The only way to solve this create a div the contains everything inside the currentCard except the star element

    // objectFromAPI means the object the corresponds to the currentCard. If the currentCard is for Doctor Strange In the Multiverse Of Madness, this object must be the object that contains all the info for that movie. It can't be an array of objects, or an object that has an array inside of it with a length of one. It has to be the single object that contains the info. So 'data' straight from the fetch API call probably won't cut it, will need to do some more manipulation
    
    // trueForMovieFalseForAlbum means write true if it's for movie modal, false if it's for album modal

    // add event listener to currentCard
    currentCard.addEventListener('click', function() {

        console.log(objectFromAPI);

        if(trueForMovieFalseForAlbum) {
            // IF MOVIE...

            // turn off album info
            modalAlbumTitle.textContent = ``;
            modalAlbumArtist.textContent = ``;
            modalAlbumReleaseDate.textContent = ``;
            modalAlbumStyle.textContent = ``;
            modalAlbumGenre.textContent = ``;
            modalAlbumScore.textContent = ``;

            // add movie info dynamically
            modalMovieTitle.textContent = `${objectFromAPI.original_title}`

            modalMovieRating.textContent = `Rating: ${objectFromAPI.vote_average}`

            modalMovieReleaseDate.textContent = `Release Date: ${objectFromAPI.release_date}`

            modalMovieDescription.textContent = `Description: ${objectFromAPI.overview}`

            // change poster src so that it's for the currentCard's movie
            modalPoster.src = `https://image.tmdb.org/t/p/w500${objectFromAPI.poster_path}`

        } else {
            // IF ALBUM...

            // turn off movie info
            modalMovieTitle.textContent = ``;
            modalMovieRating.textContent = ``;
            modalMovieReleaseDate.textContent = ``;
            modalMovieDescription.textContent = ``;

            // add album info dynamically
            modalAlbumTitle.textContent = `${objectFromAPI.strAlbum}`
            modalAlbumArtist.textContent = `Artist Name: ${objectFromAPI.strArtist}`;
            modalAlbumReleaseDate.textContent = `Year Released: ${objectFromAPI.intYearReleased}`;
            modalAlbumStyle.textContent = `Style: ${objectFromAPI.strStyle}`;
            modalAlbumGenre.textContent = `Genre: ${objectFromAPI.strGenre}`;
            modalAlbumScore.textContent = `Score: ${objectFromAPI.intScore}`;

            // change poster src so that it's for the currentCard's album
            modalPoster.src = `${objectFromAPI.strAlbumThumb}`;

        }

    })
}

