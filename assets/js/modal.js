
const dynamicallyRenderModal = function(currentCard, objectFromAPI, trueForMovieFalseForAlbum) {

    currentCard.addEventListener('click', function() {
        console.log(objectFromAPI);

        if(trueForMovieFalseForAlbum) {
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

        } else {
            // turn off movie info
            modalMovieTitle.textContent = ``;
            modalMovieRating.textContent = ``;
            modalMovieReleaseDate.textContent = ``;
            modalMovieDescription.textContent = ``;

            // add album info dynamically
            modalAlbumTitle.textContent = `Album Name: ${objectFromAPI.strAlbum}`
            modalAlbumArtist.textContent = `Artist Name: ${objectFromAPI.strArtist}`;
            modalAlbumReleaseDate.textContent = `Year Released: ${objectFromAPI.intYearReleased}`;
            modalAlbumStyle.textContent = `Style: ${objectFromAPI.strStyle}`;
            modalAlbumGenre.textContent = `Genre: ${objectFromAPI.strGenre}`;
            modalAlbumScore.textContent = `Score: ${objectFromAPI.intScore}`;

        }


    
        // change image dynamically depending on whether it's for movie or album
        if(trueForMovieFalseForAlbum) {
            modalPoster.src = `https://image.tmdb.org/t/p/w500${objectFromAPI.poster_path}`
        } else {
            modalPoster.src = `${objectFromAPI.strAlbumThumb}`;
        }

    })
}

