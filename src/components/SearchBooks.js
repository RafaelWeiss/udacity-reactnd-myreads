import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Debounce } from 'react-throttle'
import Book from './Book'
import I18n from '../utils/I18n';
import SeachInput from './SeachInput';

class SearchBooks extends Component {

    static propTypes = {
        booksSearchResult: PropTypes.array,
        message: PropTypes.string,
        onFindBooks: PropTypes.func.isRequired,
        onUpdateBook: PropTypes.func.isRequired,
        clearBooksSearchResult: PropTypes.func.isRequired
    };
    
    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search-header" to="/" onClick={this.props.clearBooksSearchResult}>
                        <I18n id="label.back" />
                    </Link>
                    <div className="search-books-input-wrapper">
                        <Debounce time="200" handler="onChange">
                            <SeachInput onFindBooks={this.props.onFindBooks}/>
                        </Debounce>
                    </div>
                </div>
                <div className="search-books-results">
                    {this.props.message && <p align="center">{this.props.message}</p>}
                    <ol className="books-grid">
                        {this.props.booksSearchResult.map((book, index) => (
                            <li key={index}>
                                <Book book={book} onUpdateBook={this.props.onUpdateBook} />
                            </li>
                        ))}
                    </ol>
                </div>
                <div className="close-search">
                    <Link to="/"><I18n id="label.back" /></Link>
                </div>
            </div>
        )
    }
}
export default SearchBooks