var searchBar = document.getElementById("search");
var searchURL = "search.html";

function search(event) {
    event.preventDefault();
    // Only search if the enter key is pressed
    if (event.key === "Enter") {
        // Go to the search page and add the search criteria in the query string
        window.location.href = searchURL + "?search=" + event.target.value;
    }
}

function searchMovie(movie, page) {
    // Searches a particular movie using themoviedb api
    fetch("https://api.themoviedb.org/3/search/movie?query=" + movie + "&api_key=" + apiKey + "&page=" + page + "&include_adult=false")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        displaySearchedMovies(data);
    });
}

function displaySearchedMovies(movies) {
    // Displays the list of movies that were searched
    var movieGridList = document.getElementById("searched-movies");
    var numPerRow = 4;
    // Remove all movies if they don't have a poster
    var moviesList = movies.results.filter(movie => movie.poster_path !== null);
    var totalRows = Math.ceil(moviesList.length / numPerRow);
    
    for (var i = 0; i < moviesList.length; i++) {
        var currMovie = moviesList[i];
        
        // Since the movieCard is in HTML, make a wrapper div that will help resize the movies
        var movieCardWrapper = document.createElement("div");
        // Calculate the size of the movie card based on the number you want on each row
        movieCardWrapper.className = "movie-card";
        
        var movieCard = getMovieCardHTML(currMovie, i, false);
        
        movieCardWrapper.innerHTML += movieCard;
        
        movieGridList.appendChild(movieCardWrapper);
    }
    
    addFavOnLoad();
    addStarEventListeners();
}

searchBar.addEventListener("keyup", search);

// Only run the search if on the search page
if (window.location.pathname.includes(searchURL)) {
    // Get the name of the searched movie from the query string
    var queryString = document.location.search;
    var movieName = queryString.split('=')[1];
    
    searchMovie(movieName, 1);
}