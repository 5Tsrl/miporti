import React from 'react'
import Autosuggest from 'react-autosuggest'
import axios from 'axios'

class GeocodeSuggest extends React.Component {  
  
  state = {suggestions: []}
  
  loadSuggestions = (inputText) => {
    const inputValue = inputText.trim().toLowerCase()
    const this_ = this
    axios.get('https://www.muoversinpiemonte.it/suggest?query=' + inputValue)
      .then(function(response){
        const suggestions = response.data.features.slice(0,6)
        this_.setState({ suggestions })
      })
  }
  
  onSuggestionsUpdateRequested = ({ value: currentInput, reason })  => {
    //reason vale type: "key pressed"  enter:"enter pressed"
    // todo: chiamare il gocoker search su enter?
    //console.log('reason', reason)
    this.loadSuggestions(currentInput)
    if(reason == 'enter'){
        //console.log('enter key pressed')            
    }
  }

  getSuggestionValue = (suggestion) => { // when suggestion selected, this function tells
    //console.log('getSuggestionValue',suggestion.properties.hint, suggestion.geometry.coordinates)
    this.props.onSuggestSelected(suggestion)
    return suggestion.properties.hint              // what should be the value of the input
  }
  
  renderSuggestion = (suggestion) => {
    return <span>{suggestion.properties.hint}</span>
  }   
    
  onSuggestSelected = (event, { suggestion, suggestionValue, sectionIndex, method }) => {
      //console.log('onSuggestSelected')
      this.props.onSuggestSelected(suggestion)
  }

  render = () =>{
      const inputProps = {
        value: this.props.value, //this.state.value,
        onChange: this.props.onChange, //this.onChange,        
        placeholder: '',
        type: 'search', 
        autoFocus: this.props.autoFocus
      }

      return <Autosuggest suggestions={this.state.suggestions}
                     onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                     getSuggestionValue={this.getSuggestionValue}
                     renderSuggestion={this.renderSuggestion}
                     onSuggestionSelected={this.onSuggestSelected}
                     inputProps={inputProps} 
                     id={this.props.id}
               />
  }
}

export default GeocodeSuggest