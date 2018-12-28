import React from 'react'
import Autosuggest from 'react-autosuggest'
import axios from 'axios'

class GeocodeSuggest extends React.Component {
  state = { suggestions: [], value: '' }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.value !== prevProps.value) {
      this.setState({ value: this.props.value })
    }
  }

  onChange = (event, { newValue }) => {
    // method: enter,click,type
    this.setState({
      value: newValue,
    })
    this.props.onChange(event, newValue)
  }

  onBlur = (event, { focusedSuggestion }) => {
    if (focusedSuggestion) {
      console.log('onBlur ', focusedSuggestion.properties.hint);
      this.setState({
        value: focusedSuggestion.properties.hint,
      })
      this.props.onSuggestSelected(focusedSuggestion)
    }
  }


  loadSuggestions = (inputText) => {
    const inputValue = inputText.trim().toLowerCase()
    // su nginx Referer: '', per unicorn
    axios.get(`/suggest?query=${inputValue}`)
      .then((response) => {
        const suggestions = response.data.features.slice(0, 6)
        this.setState({ suggestions })
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.status, error.response.data)
        } else {
          console.log('errore di rete')
        }
      })
  }


  onSuggestionsFetchRequested = ({ value }) => {
    // reason vale type: "key pressed"  enter:"enter pressed"
    // todo: chiamare il gocoker search su enter?
    // console.log('reason', reason)
    this.loadSuggestions(value)
  }

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  }

  getSuggestionValue = (suggestion) => { // when suggestion selected, this function tells
    // console.log('getSuggestionValue', suggestion.properties.hint, suggestion.geometry.coordinates)
    // this.props.onSuggestSelected(suggestion)
    return suggestion.properties.hint // what should be the value of the input
  }

  renderSuggestion = (suggestion) => {
    return <span>{suggestion.properties.hint}</span>
  }

  onSuggestionSelected = (event, { suggestion, suggestionValue, sectionIndex, method }) => {
    // console.log('onSuggestSelected')
    this.props.onSuggestSelected(suggestion)
  }

  render = () => {
    const inputProps = {
      value: this.state.value, // this.props.value
      onChange: this.onChange,
      onBlur: this.onBlur,
      placeholder: '',
      type: 'search',
      autoFocus: this.props.autoFocus,
    }

    return <Autosuggest suggestions={this.state.suggestions}
                     onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                     onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                     getSuggestionValue={this.getSuggestionValue}
                     renderSuggestion={this.renderSuggestion}
                     onSuggestionSelected={this.onSuggestionSelected}
                     inputProps={inputProps}
                     focusFirstSuggestion= {true}
                     id={this.props.id}
               />
  }
}

export default GeocodeSuggest
