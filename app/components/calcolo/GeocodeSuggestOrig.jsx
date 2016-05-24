import React from 'react'
import Autosuggest from 'react-autosuggest';
import axios from 'axios'

import './calcolo.scss';

//var _ = require('lodash');
let features = []

function getSuggestions(value) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  
  axios.get('http://mip.5t.torino.it/suggest?query=' + inputValue)
     .then(function(response){
         features = response.data.features
     })
     return inputLength === 0 ? [] : features
}
/*
function getSuggestionValue(suggestion) { // when suggestion selected, this function tells
    console.log(suggestion.properties.hint, suggestion.geometry.coordinates)
  return suggestion.properties.hint              // what should be the value of the input
}
*/
function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.properties.hint}</span>
  );
}

class GeocodeSuggest extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: getSuggestions('')
    };

    this.onChange = this.onChange.bind(this);
    this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);
  }

  onChange(event, { newValue }) {
    this.setState({
      value: newValue
    });
    //this.props.onSuggestSelected();
  }

  onSuggestionsUpdateRequested({ value }) {
    this.setState({
      suggestions: getSuggestions(value)
    });
  }
  
  getSuggestionValue(suggestion) { // when suggestion selected, this function tells
    console.log(suggestion.properties.hint, suggestion.geometry.coordinates)
    return suggestion.properties.hint              // what should be the value of the input
  }
  
  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: '',
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest suggestions={suggestions}
                   onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                   getSuggestionValue={this.getSuggestionValue}
                   renderSuggestion={renderSuggestion}
                   inputProps={inputProps} 
                   name={this.props.name}
                   id={this.props.name}
                   />
    );
  }
}

export default GeocodeSuggest