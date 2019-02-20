import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from "react-intl";
import { searchTerms } from '../constants/searchTerms.js';
import Autosuggest from 'react-autosuggest';

const searchTermsMap = searchTerms.map((term) => term.toLowerCase());

class SearchInput extends Component {
    static propTypes = {
        onFindBooks: PropTypes.func.isRequired
    };

    constructor() {
        super();
        this.state = {
            value: '',
            suggestions: []
        };
    }

    isValidTerm(query){
        return searchTermsMap.indexOf(query.toLowerCase()) !== -1;
    }

    onChange = (event, { newValue }) => {
        this.setState({ value: newValue });
        const query = newValue.trim();
        if (this.isValidTerm(query)){
            this.props.onFindBooks(query);
        }
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({ suggestions: this.getSuggestions(value) });
    };
    
    onSuggestionsClearRequested = () => {
        this.setState({ suggestions: [] });
    };

    getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        return inputLength === 0 ? [] : searchTermsMap.filter(term =>
            term.toLowerCase().slice(0, inputLength) === inputValue
        );
    };
    
    getSuggestionValue = suggestion => suggestion;
    
    renderSuggestion = suggestion => (
        <span>
            {suggestion}
        </span>
    );

    render() {;
        const intl = this.props.intl;
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: intl.formatMessage({ id: "label.SearchByTitleOrAuthor" }),
            value,
            onChange: this.onChange,
            autoFocus: true
          }; 
        return (
            <div>
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps}
                    autoFocus={true}/>
            </div>
            
        );
    }
}
export default injectIntl(SearchInput);