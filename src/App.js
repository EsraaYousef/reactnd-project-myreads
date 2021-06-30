import React, { Component } from "react";
import { Route } from "react-router-dom";
import { debounce } from "throttle-debounce";
import BooksList from "./components/books-list";
import BookSearch from "./components/book-search";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

class BooksApp extends Component {
  state = {
    bookshelves: [
      { key: "currentlyReading", name: "Currently Reading" },
      { key: "wantToRead", name: "Want to Read" },
      { key: "read", name: "Have Read" },
    ],
    books: [],
    searchBooks: [],
    error: false,
  };
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books: books,
      }));
    });
  }

  // onHandleChangeShelf = (book, shelf) => {
  //   const updateShelf = this.state.books.map((b) => {
  //     if (b.id === book.id) {
  //       b.shelf = shelf;
  //       console.log(b.shelf);
  //     }
  //     return b;
  //   });

  //   this.setState({
  //     books: updateShelf,
  //   });
  //   // alert("book moved");
  // };
  onHandleChangeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).catch((err) => {
      console.log("------", err);
      this.setState({ error: true });
    });
    if (shelf === "none") {
      this.setState((nState) => ({
        books: nState.books.filter((b) => b.id !== book.id),
      }));
      console.log("shlef none");
    } else {
      book.shelf = shelf;
      this.setState((nState) => ({
        books: nState.books.filter((b) => b.id !== book.id).concat(book),
      }));
      console.log("-----", book.shelf);
    }
  };
  //search
  searchForBooks = debounce(500, false, (query) => {
    if (query.length > 0) {
      BooksAPI.search(query).then((books) => {
        if (books.error) {
          this.setState(() => alert("No Data Found!!"));
        } else {
          this.setState({ searchBooks: books });
        }
      });
    } else {
      this.setState({ searchBooks: [] });
    }
  });
  resetSearch = () => {
    this.setState({ searchBooks: [] });
  };

  render() {
    const { bookshelves, searchBooks, books, error } = this.state;
    // console.log(bookshelves);

    if (error) {
      return <div>Bad Network.</div>;
    }

    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <BooksList
              books={books}
              bookshelves={bookshelves}
              onChangeShelf={this.onHandleChangeShelf}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <BookSearch
              books={books}
              searchBooks={searchBooks}
              onSearch={this.searchForBooks}
              onResetSearch={this.resetSearch}
              onChangeShelf={this.onHandleChangeShelf}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
