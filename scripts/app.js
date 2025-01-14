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

        
        const numberOfPages = result.data.characters.info.pages;
        
        const container = document.getElementById('pagination');
        container.innerHTML = '';
            
        // Loop to create `num` elements
        for (let i = 0; i < numberOfPages; i++) {
            const newDiv = document.createElement('div'); // Create a new div element
            newDiv.classList.add('created-element'); // Add a class for styling
            if (i + 1 === page) {
              newDiv.classList.add('text-success'); // Add a class for styling
            }
            newDiv.textContent = `${i + 1}`; // Set the text content
            container.appendChild(newDiv); // Append the new div to the container

            newDiv.addEventListener('click', function() {
              const pageNumberInput = document.getElementById('pageNumber');
              pageNumberInput.value = newDiv.textContent;
              filterData();
          });
        }
    })
    .catch((error) => {
        console.error('Error fetching characters:', error);
    });
}

fetchAndDisplayCharacters();

window.fetchAndDisplayCharacters = function (page, species = null, status = null) {
  fetchAndDisplayCharacters(page, species, status);
};

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
    document.getElementById('paginationText').textContent = translations[currentLanguage].pagination;
  
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = translations[currentLanguage][key];
    });
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
