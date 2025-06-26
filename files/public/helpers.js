// Populate dropdown menu with all the available genres
export const populateGenreDropdown = (genres) => {
    const select = document.getElementById('genres')

    for (const genre of genres) {
        let option = document.createElement("option");
        option.value = genre.id;
        option.text = genre.name;
        select.appendChild(option);
    }
};

// Returns the current genre selection from the dropdown menu
export const getSelectedGenre = () => {
    const selectedGenre = document.getElementById('genres').value;
    return selectedGenre;
};

// Creates URL objects with URL class to create/manipulate urls
export const createURL = (baseUrl, subpath='', queryString='') => {
    const url = new URL(baseUrl);

    if (subpath) url.pathname = url.pathname + subpath;
    
    if (queryString) url.search = queryString;
   
    return url;
}

// Formats API response data based on the requested search type
export const getResponseData = async (url, searchType) => {
    const data = await fetchData(url);

    if (searchType === 'genres') {
        const genres = data.genres;
        return genres;
    } else if (searchType == 'movies') {
        const movies = data.results;
        return movies;
    } else if (searchType == 'movieInfo') {
        const movieInfo = data;
        return movieInfo;
    }
}

// Fetches data from the provided URL and handles request errors
const fetchData = async (url) => {
    const errorMessage = 'Request Failed: something went wrong while fetching data!';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(errorMessage);  
        }
        const data = await response.json();
        return data;
    } catch(err) {
        console.error(err)
    }
}

// Displays the like and dislike buttons on the page
const showBtns = () => {
    const btnDiv = document.getElementById('likeOrDislikeBtns');
    btnDiv.removeAttribute('hidden');
};

// Clear the current movie from the screen
export const clearCurrentMovie = () => {
    const moviePosterDiv = document.getElementById('moviePoster');
    const movieTextDiv = document.getElementById('movieText');
    moviePosterDiv.innerHTML = '';
    movieTextDiv.innerHTML = '';
}


// Create HTML for movie poster
const createMoviePoster = (posterPath) => {
    const moviePosterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`;

    const posterImg = document.createElement('img');
    posterImg.setAttribute('src', moviePosterUrl);
    posterImg.setAttribute('id', 'moviePoster');
  
    return posterImg;
};

// Create HTML for movie title
const createMovieTitle = (title) => {
    const titleHeader = document.createElement('h1');
    titleHeader.setAttribute('id', 'movieTitle');
    titleHeader.innerHTML = title;
  
    return titleHeader;
};

// Create HTML for movie overview
const createMovieOverview = (overview) => {
    const overviewParagraph = document.createElement('p');
    overviewParagraph.setAttribute('id', 'movieOverview');
    overviewParagraph.innerHTML = overview;
  
    return overviewParagraph;
};


// Returns a random movie from the first page of movies
export const getRandomMovie = (movies) => {
    const randomIndex = Math.floor(Math.random() * movies.length);
    const randomMovie = movies[randomIndex];
    return randomMovie;
};

// Uses the DOM to create HTML to display the movie
export const displayMovie = (movieInfo) => {
  const moviePosterDiv = document.getElementById('moviePoster');
  const movieTextDiv = document.getElementById('movieText');

  // Create and append title, poster, and overview
  const moviePoster = createMoviePoster(movieInfo.poster_path);
  const titleHeader = createMovieTitle(movieInfo.title);
  const overviewText = createMovieOverview(movieInfo.overview);

  moviePosterDiv.appendChild(moviePoster);
  movieTextDiv.appendChild(titleHeader);
  movieTextDiv.appendChild(overviewText);

  showBtns();
};