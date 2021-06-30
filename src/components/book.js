import React, { Component } from "react";

class Book extends Component {
  state = {
    value: this.props.shelf,
  };

  handleChangeShelf = (event) => {
    const { value } = event.target;
    this.setState({ value });
    this.props.onChangeShelf(this.props.book, value);
  };

  render() {
    const { book } = this.props;
    // console.log(this.state.value);

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${book.imageLinks.thumbnail})`,
              }}
            />
            <div className="book-shelf-changer">
              <select
                value={this.state.value}
                onChange={this.handleChangeShelf}
              >
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">
            {book.authors ? book.authors.join(", ") : "Unknown Author"}
          </div>
        </div>
      </li>
    );
  }
}

export default Book;
