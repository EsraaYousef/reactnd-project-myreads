import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "./book";

class BookSearch extends Component {
  state = {
    value: "",
  };
  handleChange = (event) => {
    const val = event.target.value;
    this.setState({ value: val }, () => {
      console.log(val);
      this.props.onSearch(val);
    });
  };

  render() {
    const { books, searchBooks, onChangeShelf } = this.props;

    const searchBooksList = searchBooks.map((book) => {
      books.map((b) => {
        if (b.id === book.id) {
          book.shelf = b.shelf;
        }
        return b;
      });
      return book;
    });
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search" onClick={this.clearQuery}>
              Close
            </button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.handleChange}
              autoFocus
            />
          </div>
        </div>
        <div className="search-books-results">
          <ul className="books-grid">
            {searchBooksList.map((book) => (
              <Book
                key={book.id}
                book={book}
                shelf={book.shelf ? book.shelf : "none"}
                books={books}
                onChangeShelf={onChangeShelf}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default BookSearch;
