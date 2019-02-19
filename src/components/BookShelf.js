import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Shelf from './Shelf'
import shelves from '../constants/shelves.js'
import I18n from '../utils/I18n';
class BookShelf extends Component {
  static propTypes = {
    bookshelf : PropTypes.array.isRequired,
    onUpdateBook : PropTypes.func.isRequired
  }

  handleChangeLanguage = (event) =>{
    this.props.onChangeLanguage(event.target.value);
  }
  render() {

    const shelvesToDisplay = shelves.filter((shelf) => (
        shelf.show === true
    ))

    return (
      <div className="list-books">
        <div className="list-books-content">
          <div>
            {shelvesToDisplay.map((shelf)=> (
              <Shelf key={shelf.type} shelf={shelf.type} bookshelf={this.props.bookshelf} onUpdateBook={this.props.onUpdateBook}/>
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search"><I18n id="label.addBook"/></Link>
        </div>
      </div>
    )
  }
}
export default BookShelf