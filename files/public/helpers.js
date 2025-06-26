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

// Creates URL objects with URL class to create/manipulate urls
export const createURL = (baseUrl, subpath='', queryString='') => {
    const url = new URL(baseUrl);

    if (subpath) url.pathname = url.pathname + subpath;
    
    if (queryString) url.search = queryString;
   
    return url;
}