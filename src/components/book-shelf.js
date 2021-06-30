import React, { Component } from "react";
import Book from "./book";

class BookShelf extends Component {
  render() {
    const { books, shelf, onChangeShelf } = this.props;
    const CertainShelf = books.filter((book) => book.shelf === shelf.key);
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {CertainShelf.map((book) => (
              <Book
                key={book.id}
                book={book}
                shelf={shelf.key}
                onChangeShelf={onChangeShelf}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;
