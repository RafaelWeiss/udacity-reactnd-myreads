import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
import I18n from '../utils/I18n';
class Shelf extends Component {
    static propTypes = {
        shelf: PropTypes.string.isRequired,
        bookshelf: PropTypes.array.isRequired,
        onUpdateBook: PropTypes.func.isRequired
    } 

    render() {

        const booksByShelf = this.props.bookshelf.filter((book) => (
            book.shelf.toLowerCase() === this.props.shelf.toLowerCase()
        ))

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title"><I18n id={"label." + this.props.shelf} /></h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {booksByShelf && booksByShelf.map((book) => (
                        <li key={book.id}>
                            <Book book={book} onUpdateBook={this.props.onUpdateBook} />
                        </li>
                        ))}
                    </ol>
                </div>
            </div>
    )
  }
}

export default Shelf