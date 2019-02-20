import React from 'react'
import * as BooksAPI from './api/BooksAPI'
import './assets/css/App.css'
import { Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import AppHeader from './components/AppHeader'
import BookShelf from './components/BookShelf'
import SearchBooks from './components/SearchBooks'

import { SHELF_NONE, LOCALE_DEFAULT } from './constants/constants.js';
import { IntlProvider } from 'react-intl';
import AppLocale from './locales';
import I18n from './utils/I18n';

class BooksApp extends React.Component {
  state = {
    bookshelf: [],
    booksSearchResult: [],
    searchMessage: undefined,
    currentLocale: LOCALE_DEFAULT
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((bookshelf) => {
        this.setState({
          bookshelf: bookshelf
        })
      })
  }

  onChangeLanguage = (locale) => {
    this.setState({
      currentLocale: locale
    })
  }

  findBook(books, bookId) {
    return books.find(storagedBook => storagedBook.id === bookId);
  }

  findBookIndex(books, bookId) {
    return books.findIndex(storagedBook => storagedBook.id === bookId);
  }

  updateBook(book) {

    const { bookshelf } = this.state;
    const storagedBook = this.findBook(bookshelf, book.id);

    if (storagedBook && storagedBook.shelf !== SHELF_NONE) {
      bookshelf.splice(this.findBookIndex(bookshelf, book.id), 1);
    }

    if (book.shelf !== SHELF_NONE) {
      bookshelf.push(book);
    }

    this.setState({ bookshelf });
  }

  updateBooksSearchResult(book) {
    const { booksSearchResult } = this.state;
    if (!booksSearchResult || !booksSearchResult.length) {
      return;
    }
    booksSearchResult[this.findBookIndex(booksSearchResult, book.id)] = book;
    this.setState({ booksSearchResult });
  }

  notify = (msg) => {
    toast.success(msg, {
      position: toast.POSITION.TOP_RIGHT
    });
  }

  handleUpdateBook = (book) => {
    BooksAPI.update(book, book.shelf);
    this.updateBook(book);
    this.updateBooksSearchResult(book);
    this.notify(<I18n id="msg.bookAddedEditedSuccess" />);
  };

  handleFindBooks = (query) => {
    if (!query) {
      this.setState({ booksSearchResult: [], searchMessage: undefined });
      return;
    }
    BooksAPI
      .search(query)
      .then(response => {
        if (response.error) {
          this.setState({ booksSearchResult: [], searchMessage: <I18n id="msg.noBooksFound" /> });
          return;
        }

        let booksSearchResult = response;
        const { bookshelf } = this.state;

        if (booksSearchResult && Array.isArray(booksSearchResult)) {
          booksSearchResult = booksSearchResult.map(book => {
            return this.findBook(bookshelf, book.id) || book;
          });
        }
        this.setState({ booksSearchResult, searchMessage: '' });
    });
  };

  handleClearBooksSearchResult = () => {
    this.setState({ booksSearchResult: [], searchMessage: undefined });
  };

  render() {

    const { bookshelf, booksSearchResult, searchMessage, currentLocale } = this.state;
    const currentAppLocale = AppLocale[currentLocale];

    return (
      <IntlProvider
        locale={currentAppLocale.locale}
        messages={currentAppLocale.messages}>
        <div className="app">
          <AppHeader onChangeLanguage={this.onChangeLanguage}
              currentLocale={currentLocale}></AppHeader>
          <Route exact path='/' render={() => (
            <BookShelf
              bookshelf={bookshelf}
              onUpdateBook={this.handleUpdateBook}
            />
          )} />
          <Route path='/search' render={() => (
            <SearchBooks
              booksSearchResult={booksSearchResult}
              message={searchMessage}
              onFindBooks={this.handleFindBooks}
              onUpdateBook={this.handleUpdateBook}
              clearBooksSearchResult={this.handleClearBooksSearchResult} />
          )} />
          <ToastContainer autoClose={1500} />
        </div>
      </IntlProvider>
    )
  }

}
export default (BooksApp);
