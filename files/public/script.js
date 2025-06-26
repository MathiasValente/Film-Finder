import { populateGenreDropdown, getRandomMovie, displayMovie, clearCurrentMovie } from './helpers.js';
import { getGenres, getMovies, getMovieInfo } from './requestsAPI.js';

const showRandomMovie = async () => {
    clearCurrentMovie();

    const movies = await getMovies();
    const randomMovie = getRandomMovie(movies);
    const info = await getMovieInfo(randomMovie);

    displayMovie(info);

    document.getElementById('likeBtn').onclick = () => showRandomMovie();
    document.getElementById('dislikeBtn').onclick = () => showRandomMovie();

};

const init = async () => {
    const genres = await getGenres();
    if (genres) populateGenreDropdown(genres);
}

init();
document.getElementById('playBtn').addEventListener('click', () => showRandomMovie());