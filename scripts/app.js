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