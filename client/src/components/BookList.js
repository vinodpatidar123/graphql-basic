import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import { getBooksQuery } from "../queries/queries";

import BookDetails from './BookDetails';

class BookList extends Component {
  constructor(props){
    super(props);
    this.state = {
      selected : null
    }
  }
  displayBooks(){
    var data = this.props.data;

    if(data.loading){
      return ( <div>Loading books...</div>)
    }else{
      return data.books.map(Book =>{
        return (
          <li key={Book.id} onClick={e => {this.setState({selected : Book.id})}}>{ Book.name }</li>
        )
      })
    }
  }
render() {
    return (
        <div>
        <ul id="book-list">
          { this.displayBooks() }
        </ul>
        <BookDetails bookid={this.state.selected} />
      </div>
    );
}
}

export default graphql(getBooksQuery)(BookList);
