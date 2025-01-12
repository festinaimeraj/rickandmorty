import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

// Step 1: Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

// Step 2: Define GraphQL query
const GET_CHARACTERS = gql`
  query GetCharacters ($page: Int, $species: String) {
    characters(page: $page, filter: { species: $species }) {
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
export function fetchAndDisplayCharacters(page = 1, species = null) {
    client
    .query({
        query: GET_CHARACTERS,
        variables: { page, species },
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
    })
    .catch((error) => {
        console.error('Error fetching characters:', error);
    });
}

fetchAndDisplayCharacters();

