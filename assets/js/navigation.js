function getNavigationHTML() {
    return `
    <div class="navbar-fixed">
        <nav id="navigation">
            <div class="nav-wrapper">
                <a href="./index.html" id="title" class="brand-logo">m&m DB</a>
                <ul class="right">
                    <li><a id="favourites" class="waves-effect waves-light btn custom-btn">Favourites</a></li>
                    <!-- Sidebar (Hamburger Icon) -->
                    <li><a href="./sidebar.html" data-target="side-navbar" class="sidenav-trigger show-on-large right"><i class="material-icons">menu</i></a></li>
                </ul>
                <!-- Search -->
                <div id="search-bar" class="input-field">
                    <i class="material-icons prefix">search</i>
                    <input id="search" type="text">
                    <label for="search">Search</label>
                </div>
            </div>
        </nav>
    </div>`
}

function addNavigationToPage() {
    let navigation = document.getElementById("navigation-wrapper");
    
    navigation.innerHTML = getNavigationHTML();
}

// Add navigation to any page that includes this file
addNavigationToPage();