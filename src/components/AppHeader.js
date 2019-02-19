import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from "react-intl";
import locales from '../constants/locales.js';
import I18n from '../utils/I18n';

class AppHeader extends Component {
    static propTypes = {
        onChangeLanguage: PropTypes.func.isRequired,
        currentLocale: PropTypes.string.isRequired
    };

    handleChangeLanguage = (event) =>{
        this.props.onChangeLanguage(event.target.value);
    }

    render() {
        const intl = this.props.intl;
        return (
            <div className="appHeader">
                <select value={this.props.currentLocale} onChange={this.handleChangeLanguage}>
                    {locales.map(locale => (
                        <option key={locale.locale} value={locale.locale}>{intl.formatMessage({ id: locale.label })}</option>
                    ))}
                </select>
            </div>
        );
    }
}
export default injectIntl(AppHeader);