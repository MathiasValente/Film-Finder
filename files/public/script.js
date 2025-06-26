import { createURL, populateGenreDropdown } from './helpers.js'

/* The Movie Database website API initial config */
const tmdbKey = import.meta.env.VITE_TMDB_API_KEY;
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const queryString = `api_key=${tmdbKey}`;

const getGenres = async (baseUrl) => {

    const subPath = '/genre/movie/list';
    const url = createURL(baseUrl, subPath, queryString);

    try{
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Bad response');
        }
        const data = await response.json();
        const genres = data.genres;
        return genres;
    } catch(error) {
        console.log(error);
    }
};

const init = async () => {
    const genres = await getGenres(tmdbBaseUrl);
    if (genres) populateGenreDropdown(genres);
}

init();