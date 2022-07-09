const movieSearchTxt = "Movies";
const musicSearchTxt = "Music - Artists";
var searchedTerm = movieSearchTxt;

function getNavigationHTML() {
    return `
        <div class="navbar-fixed">
            <nav id="navigation">
                <div class="nav-wrapper">
                    <a href="./index.html" id="title" class="brand-logo left">m&m DB</a>
                    <ul class="right">
                        <li><a class="dropdown-trigger" href="#" data-target="search-select">Search by...<i class="material-icons right">arrow_drop_down</i></a></li>
                        <li>
                            <!-- Search -->
                            <div id="search-form">
                                <div id="search-bar" class="input-field">
                                    <i class="material-icons prefix">search</i>
                                    <input id="search" type="text">
                                    <label id="lbl_search" for="search">Search Movies...</label>
                                </div>
                            </div>
                        </li>
                        <li><a id="favourites" class="waves-effect waves-light btn custom-btn">Favourites</a></li>
                        <!-- Sidebar (Hamburger Icon) -->
                        <li><a href="#" data-target="side-navbar" class="sidenav-trigger show-on-large right"><i class="material-icons">menu</i></a></li>
                    </ul>
                </div>
            </nav>
        </div>
        <ul id="search-select" class="dropdown-content">
            <li><a href="#!">` + movieSearchTxt + `</a></li>
            <li><a href="#!">` + musicSearchTxt + `</a></li>
        </ul>
        <ul id="side-navbar" class="sidenav right">
            <li class="no-padding">
                <ul class="collapsible collapsible-accordion">
                    <li>
                        <a class="collapsible-header">Movie Genres<i class="material-icons">arrow_drop_down</i></a>
                        <div class="collapsible-body">
                            <ul id="movie-genres"></ul>
                        </div>
                    </li>
                </ul>
            </li>
            <li class="no-padding">
                <ul class="collapsible collapsible-accordion">
                    <li>
                        <a class="collapsible-header">Movie Dates<i class="material-icons">arrow_drop_down</i></a>
                        <div class="collapsible-body">
                            <ul id="movie-dates"></ul>
                        </div>
                    </li>
                </ul>
            </li>`
}

function getDropdownMovieYearHTML() {
    // Refactored parts of Gopi's code over here
    return `
        <li>
            <a href="#" id="2022_2022">2022</a>
        </li>
        <li>
            <a href="#" id="2021-12-31!2010-01-01_2010-2021">2010-2021</a>
        </li>
        <li>
            <a href="#" id="2010-12-31!2000-01-01_2000-2010">2000-2010</a>
        </li>
        <li>
            <a href="#" id="1999-12-31!1990-01-01_1990's">1990's</a>
        </li>`
}

function getDropdownMovieGenresHTML() {
    // Refactored parts of Gopi's code over here
    return `
    <li>
        <a id="28" value="28" href="#">Action</a>
    </li>
    <li>
        <a id="12" value="12" href="#">Adventure</a>
    </li>
    <li>
        <a id="16" value="16" href="#">Animation</a>
    </li>
    <li>
        <a id="35" value="35" href="#">Comedy</a>
    </li>
    <li>
        <a id="80" value="80" href="#">Crime</a>
    </li>
    <li>
        <a id="99" value="99" href="#">Documentary</a>
    </li>
    <li>
        <a id="18" value="18" href="#">Drama</a>
    </li>
    <li>
        <a id="10751" value="10751" href="#">Family</a>
    </li>
    <li>
        <a id="14" value="14" href="#">Fantasy</a>
    </li>
    <li>
        <a id="36" value="36" href="#">History</a>
    </li>
    <li>
        <a id="27" value="27" href="#">Horror</a>
    </li>
    <li>
        <a id="10402" value="10402" href="#">Music</a>
    </li>
    <li>
        <a id="9648" value="9648" href="#">Mystery</a>
    </li>
    <li>
        <a id="10749" value="10749" href="#">Romance</a>
    </li>
    <li>
        <a id="878" value="878" href="#">Science Fiction</a>
    </li>
    <li>
        <a id="10770" value="10770" href="#">TV Movie</a>
    </li>
    <li>
        <a id="53" value="53" href="#">Thriller</a>
    </li>
    <li>
        <a id="10752" value="10752" href="#">War</a>
    </li>
    <li>
        <a id="37" value="37" href="#">Western</a>
    </li>`
}

function addNavigationToPage() {
    let navigation = document.getElementById("navigation-wrapper");
    
    navigation.innerHTML = getNavigationHTML();
    
    // Not sure how to do this without jquery. Could not find it in the docs or online
    $(".dropdown-trigger").dropdown();
    $('.sidenav').sidenav({
        edge: 'right' // Make the sidenav appear on the right edge of the screen
    });
    $('.collapsible').collapsible();
    
    // Check the query string. If a dropdown value has already been selected, change the search to that
    var params = readQueryString();
    
    if (params) {
        for (var i = 0; i < params.length; i++) {
            if (params[i][0] === "term") {
                var lbl = document.getElementById("lbl_search");
                
                searchedTerm = params[i][1];
                lbl.innerHTML = "Search " + searchedTerm;
                break;
            }
        }
    }
    
    var selects = document.querySelectorAll("#search-select li a");
    
    // Add event listeners for the dropdown menu
    for(var i = 0; i < selects.length; i++) {
        selects[i].addEventListener('click', function(event) {
            var ele = event.target;
            var val = ele.text;
            var lbl = document.getElementById("lbl_search");
            // Change the search text in the search bar
            lbl.innerHTML = "Search " + val;
            searchedTerm = val;
        });
    }
    
    populateSidebar();
}

function populateSidebar() {
    // Populate the sidebar with movie genres
    // refactored gopi's code to use the fetch call for genres
    // Not using this because we want to use parts of Gopi's work as well
    // fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=" + apiKey)
    // .then(function(response) {
    //     return response.json();
    // })
    // .then(function(data) {
    //     var dropdown = document.getElementById("movie-genres");
        
    //     data.genres.forEach(function(genre) {
    //         // Add genres to the sidenav
    //         var li = document.createElement("li");
    //         var genreLink = document.createElement("a");
            
    //         genreLink.innerHTML = genre.name;
    //         genreLink.id = genre.id;
            
    //         li.appendChild(genreLink);
    //         dropdown.appendChild(li);
            
    //         // Add an event listener to the genre buttons
    //         genreLink.addEventListener("click", searchByMovieGenre);
    //     });
    // });
    
    $(document).ready(function() {
        // Refactored Gopi's code to use the pre-existing search page
        // Populate with movie genres
        var dropdownMovieGenres = document.getElementById("movie-genres");
        dropdownMovieGenres.innerHTML = getDropdownMovieGenresHTML();
        dropdownMovieGenres.addEventListener("click", searchByMovieGenre);
        
        // Populate with movie dates
        var dropdownMovieYear = document.getElementById("movie-dates");
        dropdownMovieYear.innerHTML = getDropdownMovieYearHTML();
        // Add event listeners to all the elements in the movie dates dropdown
        dropdownMovieYear.addEventListener("click", searchByMovieDates);
    });
}

// Add navigation to any page that includes this file
addNavigationToPage();