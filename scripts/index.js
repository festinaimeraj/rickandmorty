function filterData () {
    const species = document.getElementById('searchInput').value;
    const status = document.getElementById('status').value.toLowerCase() ?? null;
    const pageNumber = document.getElementById('pageNumber').value;
    window.fetchAndDisplayCharacters(pageNumber, species, status);
}

function filterByStatus () {
    document.getElementById('pageNumber').value = 1;
    filterData();
}

function searchBySpecies () {
    document.getElementById('pageNumber').value = 1;
    filterData();
}