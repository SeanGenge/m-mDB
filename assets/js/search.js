var searchBar = document.getElementById("search");
var searchURL = "search.html";

// modal variables
let modalPoster = document.querySelector('.modal-poster');

// modal variables for movies
let modalMovieTitle = document.querySelector('.modal-movie-title');
let modalMovieRating = document.querySelector('.modal-movie-rating');
let modalMovieReleaseDate = document.querySelector('.modal-release-date');
let modalMovieDescription = document.querySelector('.modal-description');

// modal variables for albums
let modalAlbumTitle = document.querySelector('.modal-album-title');
let modalAlbumArtist = document.querySelector('.modal-album-artist');
let modalAlbumReleaseDate = document.querySelector('.modal-album-release-date');
let modalAlbumStyle = document.querySelector('.modal-album-style');
let modalAlbumGenre = document.querySelector('.modal-album-genre');
let modalAlbumScore = document.querySelector('.modal-album-score');

function search(event) {
    event.preventDefault();
    // Only search if the enter key is pressed
    if (event.key === "Enter") {
        // Go to the search page and add the search criteria in the query string
        window.location.href = searchURL + "?search=" + event.target.value + "&term=" + searchedTerm;
    }
}

function searchMovie(movie, page) {
    // Searches a particular movie using themoviedb api
    fetch("https://api.themoviedb.org/3/search/movie?query=" + movie + "&api_key=" + apiKey + "&page=" + page + "&include_adult=false&language=en-US")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        if (data.results.length != 0) {
            // Change the title to the name of the movie
            var qParams = readQueryString();
            var title = document.getElementById("search-title");
            title.innerHTML = qParams[0][1].replace("%20", " ");
            
            displaySearchedMovies(data);
        }
        else {
            var title = document.getElementById("search-title");
            title.innerHTML = "Sorry, no movies were found";
        }
    });
}

function searchMusic(music) {
    // Searches a particular music album using audioDB
    fetch("https://theaudiodb.com/api/v1/json/" + musicApiKey + "/searchalbum.php?s=" + music)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        if (data.album !== null) {
            // Change the title to the name of the artist
            var qParams = readQueryString();
            var title = document.getElementById("search-title");
            title.innerHTML = qParams[0][1].replace("%20", " ");
            
            displaySearchedMusic(data);
        }
        else {
            var title = document.getElementById("search-title");
            title.innerHTML = "Sorry, no albums were found";
        }
    });
}

function searchMovieGenre(genre, genreName) {
    // Searches movies based on genres
    fetch(`https://api.themoviedb.org/3/movie/popular?&language=en-US&with_genres=${genre}&api_key=${apiKey}`)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        var title = document.getElementById("search-title");
        title.innerHTML = genreName;
        
        displaySearchedMovies(data);
    });
}

function searchMovieDates(date, dateName) {
    // Searches movies based on date
    var release_date = "primary_release_year=" + date;
    // Split up the dates since there may be two
    var dates = date.split("!");
    
    if (dates.length == 2) {
        release_date = "primary_release_date.lte=" + dates[0] + "&primary_release_date.gte=" + dates[1];
    }
    
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&language=en-US&include_adult=false&page=1&${release_date}`)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        var title = document.getElementById("search-title");
        dateName = dateName.replace("%27", "'");
        title.innerHTML = dateName;
        
        displaySearchedMovies(data);
    });
}

function searchByMovieDates(event) {
    // Goes to the search page to search for a particular date range
    if (event.target.matches("a")) {
        window.location.href = searchURL + "?date=" + event.target.id + "_" + event.target.text + "&term=" + movieSearchTxt;
    }
}

function searchByMovieGenre(event) {
    // Goes to the search page to search for a particular genre
    if (event.target.matches("a")) {
        window.location.href = searchURL + "?genre=" + event.target.id + "_" + event.target.text + "&term=" + movieSearchTxt;
    }
}

function displaySearchedMovies(movies) {
    // Displays the list of movies that were searched
    var movieGridList = document.getElementById("search-results");
    // Remove all movies if they don't have a poster
    var moviesList = movies.results.filter(movie => movie.poster_path !== null);
    
    for (var i = 0; i < moviesList.length; i++) {
        var currMovie = moviesList[i];
        
        // Since the movieCard is in HTML, make a wrapper div that will help resize the movies
        var movieCardWrapper = document.createElement("div");
        movieCardWrapper.className = "search-card movie-card";
        
        var movieCard = getMovieCardHTML(currMovie, i, false);
        
        movieCardWrapper.innerHTML += movieCard;
        
        movieGridList.appendChild(movieCardWrapper);
        
        dynamicallyRenderModal(movieCardWrapper, currMovie, true);
    }
    
    addFavOnLoad();
    addStarEventListeners();
}

function displaySearchedMusic(music) {
    // Displays the list of music that were searched based on the artist
    var musicGridList = document.getElementById("search-results");
    
    // Remove all music if they don't have an album image
    var musicList = music['album'].filter(m => m.strAlbumThumb !== null);
    
    for (var i = 0; i < musicList.length; i++) {
        var currMusic = musicList[i];
        
        // Since the musicCard is in HTML, make a wrapper div that will help resize the music cards
        var musicCardWrapper = document.createElement("div");
        musicCardWrapper.className = "search-card";
        
        var musicCard = getMusicCardHTML(currMusic, i, false);
        
        musicCardWrapper.innerHTML += musicCard;
        
        musicGridList.appendChild(musicCardWrapper);
        
        dynamicallyRenderModal(musicCardWrapper, currMusic, false);
    }
    
    addFavOnLoad();
    addStarEventListeners();
}

searchBar.addEventListener("keyup", search);

// Only run the search if on the search page
if (window.location.pathname.includes(searchURL)) {
    var params = readQueryString();
    var searchStr = params[0];
    var searchBy = params[1];
    
    // If it was a movie, search by movie. If not search by music artists
    if (searchBy[1] === movieSearchTxt) {
        // If there is genre then search by genre. If not search by movie
        if (searchStr[0] === "genre") {
            var genre = searchStr[1].split("_");
            
            searchMovieGenre(genre[0], genre[1]);
        }
        else if (searchStr[0] === "date") {
            var date = searchStr[1].split("_");
            
            searchMovieDates(date[0], date[1]);
        }
        else {
            searchMovie(searchStr[1], 1);
        }
    }
    else if (searchBy[1] === musicSearchTxt) {
        searchMusic(searchStr[1]);
    }
}

$('document').ready(function() {
    $('.modal').modal()
})