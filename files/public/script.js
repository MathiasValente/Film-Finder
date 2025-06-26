import { createURL, populateGenreDropdown, getResponseData, getSelectedGenre, getRandomMovie, displayMovie, clearCurrentMovie } from './helpers.js'

/* The Movie Database website API initial config */
const tmdbKey = import.meta.env.VITE_TMDB_API_KEY;
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const queryString = `api_key=${tmdbKey}`;

const getGenres = async (baseUrl) => {

    const subPath = '/genre/movie/list';
    const url = createURL(baseUrl, subPath, queryString);

    const genres = await getResponseData(url, 'genres');
    return genres;
};

const getMovies = async (baseUrl) => {

    const subPath = '/discover/movie';
    const url = createURL(baseUrl, subPath, queryString);
    const selectedGenre = getSelectedGenre();
    url.searchParams.append('with_genres', selectedGenre);

    const movies = await getResponseData(url, 'movies');
    return movies;
}

const getMovieInfo = async (baseUrl, movie) => {
    const movieId = movie.id;
    const subpath = `/movie/${movieId}`;
    const url = createURL(baseUrl, subpath, queryString);

    const movieInfo = await getResponseData(url, 'movieInfo');
    return movieInfo;
};

const showRandomMovie = async (baseURL) => {
  clearCurrentMovie();  // Now always clears before showing new one

  const movies = await getMovies(baseURL);
  const randomMovie = getRandomMovie(movies);
  const info = await getMovieInfo(baseURL, randomMovie);

  displayMovie(info);

  // Button setup (important to rebind each time)
  document.getElementById('likeBtn').onclick = likeMovie;
  document.getElementById('dislikeBtn').onclick = dislikeMovie;
};

const likeMovie = () => {
  showRandomMovie(tmdbBaseUrl);
};

const dislikeMovie = () => {
  showRandomMovie(tmdbBaseUrl);
};

const init = async () => {
    const genres = await getGenres(tmdbBaseUrl);
    if (genres) populateGenreDropdown(genres);
}

init();
const playBtn = document.getElementById('playBtn');
playBtn.addEventListener('click', () => {
  showRandomMovie(tmdbBaseUrl);
});