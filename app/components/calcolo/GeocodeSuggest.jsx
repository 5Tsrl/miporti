import React from 'react'
import Autosuggest from 'react-autosuggest';
import axios from 'axios'



//var _ = require('lodash');
let features = []


const GeocodeSuggest = React.createClass({
    getInitialState: function(){
            return {suggestions: []}
    },
    
    loadSuggestions: function(inputText) {
      const inputValue = inputText.trim().toLowerCase();
      const this_ = this
      axios.get('http://mip.5t.torino.it/suggest?query=' + inputValue)
         .then(function(response){
             const suggestions = response.data.features.slice(0,6)
             this_.setState({ suggestions })
         })
    },
    
    onSuggestionsUpdateRequested: function({ value: currentInput, reason }) {
        this.loadSuggestions(currentInput);
        if(reason == 'enter'){
            //console.log('enterato')            
        }
    },
  
    getSuggestionValue: function(suggestion) { // when suggestion selected, this function tells
      console.log('getSuggestionValue',suggestion.properties.hint, suggestion.geometry.coordinates)
      this.props.onSuggestSelected(suggestion)
      return suggestion.properties.hint              // what should be the value of the input
    },
    
    renderSuggestion: function(suggestion) {
      return (
        <span>{suggestion.properties.hint}</span>
      );
    },    
    
    onSuggestSelected: function(event, { suggestion, suggestionValue, sectionIndex, method }) {
        console.log('onSuggestSelected')
        this.props.onSuggestSelected(suggestion)
    },    
  
    render: function() {
        const inputProps = {
          value: this.props.value, //this.state.value,
          onChange: this.props.onChange, //this.onChange,        
          placeholder: '',
          type: 'search', 
          autoFocus: this.props.autoFocus
                 
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