import { createURL, getResponseData, getSelectedGenre } from './helpers.js'

/* The Movie Database website API initial config */
const tmdbKey = import.meta.env.VITE_TMDB_API_KEY;
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const queryString = `api_key=${tmdbKey}`;

export const getGenres = async () => {

    const subPath = '/genre/movie/list';
    const url = createURL(tmdbBaseUrl, subPath, queryString);

    const genres = await getResponseData(url, 'genres');
    return genres;
};

export const getMovies = async () => {

    const subPath = '/discover/movie';
    const url = createURL(tmdbBaseUrl, subPath, queryString);
    const selectedGenre = getSelectedGenre();
    url.searchParams.append('with_genres', selectedGenre);

    const movies = await getResponseData(url, 'movies');
    return movies;
}

export const getMovieInfo = async (movie) => {
    const movieId = movie.id;
    const subpath = `/movie/${movieId}`;
    const url = createURL(tmdbBaseUrl, subpath, queryString);

    const movieInfo = await getResponseData(url, 'movieInfo');
    return movieInfo;
};