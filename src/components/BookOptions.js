import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shelves from '../constants/shelves.js';
import { SHELF_NONE } from '../constants/constants.js';
import { injectIntl } from "react-intl";

class BookOptions extends Component {
    static propTypes = {
        shelf: PropTypes.string,
        onChangeOption: PropTypes.func.isRequired
    };

    handleChangeSelect = (event) => {
        this.props.onChangeOption(event.target.value);
    };

    render() {
        const shelf = this.props.shelf ? this.props.shelf : SHELF_NONE;
        const intl = this.props.intl;
        return (
            <select value={shelf} onChange={this.handleChangeSelect}>
                <option disabled>{intl.formatMessage({ id: "label.moveTo" })}</option>
                {shelves.map(shelf => (
                    <option key={shelf.type} value={shelf.type}>
                        {intl.formatMessage({ id: shelf.label })}
                    </option>
                ))}
            </select>
        );
    }
}
export default injectIntl(BookOptions);