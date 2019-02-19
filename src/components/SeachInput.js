import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shelves from '../constants/shelves.js';
import { SHELF_NONE } from '../constants/constants.js';
import { injectIntl } from "react-intl";

class BookOptions extends Component {
    static propTypes = {
        onFindBooks: PropTypes.func.isRequired
    };

    handleChangeSearchInput = ({ target }) => {
        const query = target.value;
        this.props.onFindBooks(query);
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