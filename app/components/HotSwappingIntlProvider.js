import React from 'react'
import ReactDOM from 'react-dom'
import {addLocaleData, IntlProvider} from 'react-intl';
import it from 'react-intl/locale-data/it';
import en from 'react-intl/locale-data/en';

import messages_en   from '../messages/en.js'
import messages_it   from '../messages/it.js'


console.log('messages',messages_en)

addLocaleData([ ...it, ...en]);


export default class HotSwappingIntlProvider extends React.Component {
  
     
    
    constructor(props) {
        super(props);
        let {initialLocale: locale, initialMessages: messages} = props;
        //locale = 'en'
        //messages = messages_en
        this.state = {locale, messages}
        
        //this.locales = ['it', 'en']
        
        setInterval(() => {
          if(this.state.locale == 'it')
            this.state.locale ='en' 
          else 
            this.state.locale ='it' 
          
          console.log(this.state.locale)
          this.changeLang(this.state.locale)
          
        }, 3000);
        
    }
    
    changeLang(locale){
      //this.setState.locale = locale
      let newMessages
      if(this.state.locale == 'it')
        newMessages  = messages_it
      else 
        newMessages  = messages_en
      
      //const newMessages = require(`../messages/${this.state.locale}.js`)
      console.log('newMessages', newMessages)
      this.setState({messages : newMessages})
      
    }

    render() {
        return (
            <IntlProvider {...this.state}>
                {this.props.children}
            </IntlProvider>
        );
    }
}
