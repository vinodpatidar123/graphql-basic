import React from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import BookList from './components/BookList';
import AddBook from './components/AddBook';


const client = new ApolloClient({
  uri : "https://graphqlreadinglist.herokuapp.com/graphql"
})

function App() {
  return (
    <ApolloProvider client={client}>
    <div id="main">
      <h1>GraphQl Reading List</h1>
      <AddBook />
      <BookList />
    </div>
    </ApolloProvider>
  );
}

export default App;
