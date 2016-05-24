import React from 'react'
import Autosuggest from 'react-autosuggest';
import axios from 'axios'



//var _ = require('lodash');
let features = []


const GeocodeSuggest = React.createClass({
    getInitialState: function(){
            return {suggestions: []}
    },
    
    getSuggestions: function(inputText) {
      const inputValue = inputText.trim().toLowerCase();
      const inputLength = inputValue.length;
      
      axios.get('http://mip.5t.torino.it/suggest?query=' + inputValue)
         .then(function(response){
             features = response.data.features.slice(0,7)
         })
         return inputLength === 0 ? [] : features
    },
    
    onSuggestionsUpdateRequested: function({ value: currentInput }) {
        this.setState({
          suggestions: this.getSuggestions(currentInput)
        });
    },
  
    getSuggestionValue: function(suggestion) { // when suggestion selected, this function tells
      console.log(suggestion.properties.hint, suggestion.geometry.coordinates)
      return suggestion.properties.hint              // what should be the value of the input
    },
    
    renderSuggestion: function(suggestion) {
      return (
        <span>{suggestion.properties.hint}</span>
      );
    },    
    
    onSuggestSelected: function(event, { suggestion, suggestionValue, sectionIndex, method }) {
        console.log('cucu')
        this.props.onSuggestSelected(suggestion);
    },    
  
    render: function() {
        const inputProps = {
          value: this.props.value, //this.state.value,
          onChange: this.props.onChange, //this.onChange,        
          placeholder: '',
          type: 'search',          
        };

        return (
          <Autosuggest suggestions={this.state.suggestions}
                       onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                       getSuggestionValue={this.getSuggestionValue}
                       renderSuggestion={this.renderSuggestion}
                       onSuggestionSelected={this.onSuggestSelected}
                       inputProps={inputProps} 
                       id={this.props.id}
                       />
        );
    }
})

export default GeocodeSuggest