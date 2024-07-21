$(document).ready(function() {
    fetchMovies('now_playing', '#nowPlayingGrid');
    fetchMovies('popular', '#popularGrid');
    fetchMovies('top_rated', '#topRatedGrid');
    fetchMovies('trending', '#trendingGrid');
    fetchMovies('upcoming', '#upcomingGrid');

    $('#contactForm').submit(function(event) {
        const password = $('#password').val();
        const repassword = $('#repassword').val();
        
        if (password !== repassword) {
            alert("Passwords do not match!");
            event.preventDefault();
        }
    });

    $(window).scroll(function() {
        if ($(this).scrollTop() > 20) {
            $('#scrollTopBtn').fadeIn();
        } else {
            $('#scrollTopBtn').fadeOut();
        }
    });

    $('#sideNav a').on('click', function() {
        const target = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(target).offset().top
        }, 1000);
        $('#sideNav').css('width', '0');
    });
});

function fetchMovies(category, gridId) {
    const apiKey = 'eba8b9a7199efdcb0ca1f96879b83c44'; 
    const url = `https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}`;

    $.getJSON(url, function(data) {
        const movies = data.results;
        const movieGrid = $(gridId);

        movies.forEach(movie => {
            const movieCard = $('<div>').addClass('movie-card');

            const moviePoster = $('<img>').attr('src', `https://image.tmdb.org/t/p/w500/${movie.poster_path}`)
                                        .attr('alt', movie.title || movie.name);

            const movieInfo = $('<div>').addClass('movie-info')
                                        .html(`
                                            <h3>${movie.title || movie.name}</h3>
                                            <p>${movie.overview}</p>
                                            <p>Rating: ${movie.vote_average}</p>
                                            <p>Release Date: ${movie.release_date || movie.first_air_date}</p>
                                        `);

            movieCard.append(moviePoster).append(movieInfo);
            movieGrid.append(movieCard);
        });
    });
}

function searchMovies() {
    const query = $('#searchInput').val();
    const apiKey = 'eba8b9a7199efdcb0ca1f96879b83c44';
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;

    $.getJSON(url, function(data) {
        const movies = data.results;
        const searchGrid = $('<div>').addClass('movie-grid');

        movies.forEach(movie => {
            const movieCard = $('<div>').addClass('movie-card');

            const moviePoster = $('<img>').attr('src', `https://image.tmdb.org/t/p/w500/${movie.poster_path}`)
            .attr('alt', movie.title || movie.name);

            const movieInfo = $('<div>').addClass('movie-info')
                                        .html(`
                                            <h3>${movie.title || movie.name}</h3>
                                            <p>${movie.overview}</p>
                                            <p>Rating: ${movie.vote_average}</p>
                                            <p>Release Date: ${movie.release_date || movie.first_air_date}</p>
                                        `);

            movieCard.append(moviePoster).append(movieInfo);
            searchGrid.append(movieCard);
        });

        $('#search').append(searchGrid);
    });
}

function toggleNav() {
    const sideNav = $('#sideNav');
    const width = sideNav.css('width') === '0px' ? '250px' : '0';
    sideNav.css('width', width);
}

function scrollToTop() {
    $('html, body').animate({ scrollTop: 0 }, 'slow');
}


