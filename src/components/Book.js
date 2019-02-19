import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookOptions from './BookOptions'

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  }
  
  handleBookOptions = shelf => {
    this.props.onUpdateBook({...this.props.book, shelf});
  };

  render() {

    let book = this.props.book;

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
          <div className="book-shelf-changer">
            <BookOptions shelf={book.shelf} onChangeOption={this.handleBookOptions}/>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors && book.authors.map(author => (
            <span key={author}>{author}</span>
          ))}
        </div>
      </div>
    )
  }
}

export default Book