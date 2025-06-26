import { createURL, populateGenreDropdown, getResponseData, getSelectedGenre } from './helpers.js'

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

const init = async () => {
    const genres = await getGenres(tmdbBaseUrl);
    if (genres) populateGenreDropdown(genres);
}

init();