import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from "react-intl";
import { searchTerms } from '../constants/searchTerms.js';

const searchTermsMap = searchTerms.map((term) => term.toLowerCase());

class BookOptions extends Component {
    static propTypes = {
        onFindBooks: PropTypes.func.isRequired
    };

    isValidTerm(query){
        return searchTermsMap.indexOf(query.toLowerCase()) !== -1;
    }

    handleChangeSearchInput = ({ target }) => {
        const query = target.value.trim();
        if (this.isValidTerm(query)){
            this.props.onFindBooks(query);
        }
    };

    render() {;
        const intl = this.props.intl;
        return (
            <input type="text"
                    placeholder={intl.formatMessage({ id: "label.SearchByTitleOrAuthor" })}
                    onChange={this.handleChangeSearchInput}
                    autoFocus={true} />
        );
    }
}
export default injectIntl(BookOptions);