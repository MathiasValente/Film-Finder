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