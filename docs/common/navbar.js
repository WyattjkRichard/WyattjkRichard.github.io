// this doc will need to be able to add a navbar into any page
// it needs to know the relative path to the root of the docs folder

const navbar = document.getElementById("navbar-placeholder");
const root = navbar.dataset.root || "./";


navbar.innerHTML = `
<nav class="navbar navbar-expand-sm bg-secondary fixed-top navbar-dark">
    <div class="container-fluid">
        <a class="navbar-brand" href="${root}index.html">WJKR</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="mynavbar">
            <ul class="navbar-nav me-auto">
                <li class="nav-item">
                    <a class="nav-link" href="${root}index.html">Home</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">Projects</a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="${root}projects-school/projects-school-index.html">School Projects</a></li>
                        <li><a class="dropdown-item" href="${root}projects-web/projects-web.html">Web Projects</a></li>
                        <li><a class="dropdown-item" href="${root}projects-pico8/projects-pico8.html">Pico8 Projects</a></li>
                    </ul>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">Other</a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="${root}other/gallery/index.html">Gallery</a></li>
                        <li><a class="dropdown-item" href="${root}other/Guides/index.html">Guides</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>`;