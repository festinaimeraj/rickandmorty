import * as Fetch from './app.js';

function searchBySpecies() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase();
    Fetch.fetchAndDisplayCharacters(1, searchTerm);
    
}
