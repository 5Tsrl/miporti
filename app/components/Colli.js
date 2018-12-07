import React from 'react'
import classNames from 'classnames'
import Collapse from 'react-collapse'
import { injectIntl, FormattedMessage } from 'react-intl'
import axios from 'axios'

const SelectorText = (props) => {
  const classes = classNames('btn_link', { open: props.open })
  return <span className={classes} onClick={props.onTextClick}>{props.text}</span>
}

const SelectorTexts = ({ open, texts }) => {
  const textsNodes = texts && texts.map((colle, idx) => {
    return <li className={colle.Stato} key={idx} ><span>{colle.Nome}</span></li>
  })
  return (
    <Collapse isOpened={open} >
      <ul className='elencoColli' >
          {textsNodes}
      </ul>
    </Collapse>
  )
}

class Selector extends React.Component {
  state = { open: false }

  handleTextClick = () => this.setState({ open: !this.state.open })

  render() {
    return (
      <div>
        <SelectorText open={this.state.open} text={this.props.text} onTextClick={this.handleTextClick} />
        <SelectorTexts open={this.state.open} texts={this.props.texts}/>
      </div>
    )
  }
}

class Colli extends React.Component {
  state = { colli: [] }

  loadDataFromServer = () => {
    axios
      .get('/colli')
      .then(res => this.setState({ colli: res.data }))
      .catch((error) => {
        if (error.response) {
          console.log(error.response.status, error.response.data)
        } else {
          console.log('errore di rete')
        }
      })
  }

  componentDidMount = () => {
    if (this.state.colli.length === 0) {
      this.loadDataFromServer()
    }
  }

  render() {
    return (
      <div className='widget_imgbg'>
        <h2 className='title-3'><FormattedMessage id='colli'/></h2>
        <p><FormattedMessage id='info_apertura' /></p>
        <Selector texts={this.state.colli} text={this.props.intl.formatMessage({ id: 'info_colli' })}/>
      </div>
    )
  }
}

export default injectIntl(Colli)
