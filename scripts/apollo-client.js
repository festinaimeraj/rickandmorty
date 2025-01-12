import { ApolloClient, InMemoryCache, gql } from '@apollo/client/core';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql', // GraphQL endpoint
  cache: new InMemoryCache(),
});

export { client, gql };
