import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

// Step 1: Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

// Step 2: Define GraphQL query
const GET_CHARACTERS = gql`
  query GetCharacters ($page: Int, $species: String, $status: String) {
    characters(page: $page, filter: { species: $species, status: $status }) {
      info {
        count,
        next,
        prev,
        pages,
      }
      results {
        name
        status
        species
        gender
        origin {
          name
        }
      }
    }
  }
`;

// Step 3: Fetch Data and Populate Table
function fetchAndDisplayCharacters(page = 1, species = null, status = null) {
  page = parseInt(page);
    client
    .query({
        query: GET_CHARACTERS,
        variables: { page, species, status },
    })
    .then((result) => {
        const characters = result.data.characters.results;

        // Step 4: Populate the Table
        const tableBody = document.getElementById('characterTableBody');
        tableBody.innerHTML = ''; // Clear existing rows

        characters.forEach((character) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${character.name}</td>
            <td>${character.status}</td>
            <td>${character.species}</td>
            <td>${character.gender}</td>
            <td>${character.origin.name}</td>
        `;
        tableBody.appendChild(row);
        });

      currentPage = page;
    })
    .catch((error) => {
      console.error('Error fetching characters:', error);
    })
    .finally(() => {
      isFetching = false;
    });
}

// Infinite scrolling event listener
function handleScroll() {
  const scrollable = document.documentElement;
  const scrollTop = scrollable.scrollTop || document.body.scrollTop;
  const scrollHeight = scrollable.scrollHeight || document.body.scrollHeight;
  const clientHeight = scrollable.clientHeight || window.innerHeight;

  if (scrollTop + clientHeight >= scrollHeight - 50) {
    fetchAndDisplayCharacters(currentPage + 1, null, null, true);
  }
}

// Initial data fetch
fetchAndDisplayCharacters();

// Attach infinite scroll listener
window.addEventListener('scroll', handleScroll);


// Default Language
let currentLanguage = 'en';

// Fetch Translation Files
const translations = {
  en: {},
  de: {}
};

async function loadTranslations() {
  translations.en = await fetch('/translations/en.json').then(res => res.json());
  translations.de = await fetch('/translations/de.json').then(res => res.json());
  applyTranslations();
}

// Apply Translations to DOM
function applyTranslations() {
    document.getElementById('footerText').textContent = translations[currentLanguage].footerText;
    document.getElementById('languageLabel').textContent = translations[currentLanguage].language;
    document.getElementById('paginationName').textContent = translations[currentLanguage].paginationName;
    document.getElementById('characterName').textContent = translations[currentLanguage].characterName;
    document.getElementById('statusText').textContent = translations[currentLanguage].statusText;
    document.getElementById('speciesText').textContent = translations[currentLanguage].speciesText;
    document.getElementById('genderText').textContent = translations[currentLanguage].genderText;
    document.getElementById('originText').textContent = translations[currentLanguage].originText;
    document.getElementById('searchPlaceholder').textContent = translations[currentLanguage].searchPlaceholder;
    document.getElementById('chooseStatus').textContent = translations[currentLanguage].chooseStatus;
    document.getElementById('aliveText').innerHTML = translations[currentLanguage].aliveText;
    document.getElementById('deadText').innerHTML = translations[currentLanguage].deadText;
    document.getElementById('unknownText').innerHTML = translations[currentLanguage].unknownText;
  }
  

// Handle Language Switching
document.getElementById('languageSwitcher').addEventListener('change', (event) => {
  currentLanguage = event.target.value;
  applyTranslations();
});

// Initial Setup
loadTranslations();


let currentSort = {
  column: '',
  order: ''
};

function sortTable(column) {
  const characterTableBody = document.getElementById('characterTableBody');
  let rows = Array.from(characterTableBody.getElementsByTagName('tr'));

  const columnIndex = getColumnIndex(column); 
  const ascending = currentSort.column !== column || currentSort.order !== 'asc';

  rows.sort((a, b) => {
    const textA = a.children[columnIndex].innerText.toLowerCase();
    const textB = b.children[columnIndex].innerText.toLowerCase();
    return ascending ? textA.localeCompare(textB) : textB.localeCompare(textA);
  });

  currentSort = { column, order: ascending ? 'asc' : 'desc' }; 
  characterTableBody.innerHTML = '';
  rows.forEach(row => characterTableBody.appendChild(row));

  updateSortIcons(column, currentSort.order);
}

function getColumnIndex(column) {
  const columns = ['name', 'status', 'species', 'gender', 'origin'];
  return columns.indexOf(column); 
}

function updateSortIcons(column, order) {
  // Reset icons for all columns
  document.querySelectorAll('.sortable i').forEach(icon => {
    icon.className = 'fa fa-fw fa-sort'; // Default sort icon
  });

  // Update the clicked column's icon
  const header = document.querySelector(`th[data-column="${column}"] i`);
  if (order === 'asc') {
    header.className = 'fa fa-fw fa-sort-asc';
  } else if (order === 'desc') {
    header.className = 'fa fa-fw fa-sort-desc';
  }
}

// Add event listeners to sortable column headers
document.querySelectorAll('.sortable').forEach(header => {
  const column = header.getAttribute('data-column');
  header.addEventListener('click', () => sortTable(column));
});