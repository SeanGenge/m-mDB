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
                    <li><a id="favourites" href="./favouritesPage.html" class="waves-effect waves-light btn custom-btn">Favourites</a></li>

                    <!-- Sidebar (Hamburger Icon) -->
                    <li><a href="./sidebar.html" data-target="side-navbar" class="sidenav-trigger show-on-large right"><i class="material-icons">menu</i></a></li>
                </ul>
                
            </div>
        </nav>
        <ul id="search-select" class="dropdown-content">
            <li><a href="#!">` + movieSearchTxt + `</a></li>
            <li><a href="#!">` + musicSearchTxt + `</a></li>
        </ul>
    </div>`
}

function addNavigationToPage() {
    let navigation = document.getElementById("navigation-wrapper");
    
    navigation.innerHTML = getNavigationHTML();
    
    // Not sure how to do this without jquery. Could not find it in the docs or online
    $(".dropdown-trigger").dropdown();
    
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
}

// Add navigation to any page that includes this file
addNavigationToPage();