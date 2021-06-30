import React, { Component } from "react";
import { Link } from "react-router-dom";
import BookShelf from "./book-shelf";

class BooksList extends Component {
  state = {};

  render() {
    const { books, bookshelves, onChangeShelf } = this.props;
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              {bookshelves.map((shelf) => (
                <BookShelf
                  key={shelf.key}
                  shelf={shelf}
                  books={books}
                  onChangeShelf={onChangeShelf}
                />
              ))}
            </div>
          </div>
          <div className="open-search">
            <Link to="search">
              <button>Add a Book</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default BooksList;
