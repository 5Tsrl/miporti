import React from 'react';
import {FormattedMessage} from 'react-intl'
import classNames from 'classnames';
import axios from 'axios'

const Volo = React.createClass({
  render: function() {
    return (
        <tr>
            <td>{this.props.data}</td>
            <td>{this.props.ora}</td>
            <td>{this.props.destinazione}</td>
            <td>{this.props.volo}</td>
            <td className="note">{this.props.imbarco}</td>
        </tr>
    );
  }
});


const VoliTable = React.createClass({
  render: function() {
    var voliNodes = this.props.voli.map( function(volo, idx){
        return(
            <Volo key={idx} data={volo.data} ora={volo.ora} destinazione={volo.destinazione} volo={volo.volo} imbarco={volo.stato} />
        )
    }.bind(this))
    return (
        <div className="tabs_container">
            <div className="tab_container first_active voli_partenze">
                <table className="tabella_voli">
                    <thead>
                        <tr>
                            <th><FormattedMessage id='Data'/></th>
                            <th><FormattedMessage id='Ora'/></th>
                            <th>{this.props.partenzeArrivi == 'partenze'? <FormattedMessage id='Destinazione'/>:<FormattedMessage id='Provenienza'/>}</th>
                            <th><FormattedMessage id='Volo'/></th>
                            <th>{this.props.partenzeArrivi == 'partenze'? <FormattedMessage id='imbarco'/>:<FormattedMessage id='note'/>}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {voliNodes}
                    </tbody>
                </table>
            </div>
        </div>

    );
  }
});

var VoliTabs = React.createClass({
  render: function() {
    var classesPartenze = classNames('tab_label tab_left',{'tab_active': this.props.partenzeArrivi == 'partenze' })
    var classesArrivi   = classNames('tab_label tab_right',{'tab_active': this.props.partenzeArrivi == 'arrivi'} )

    return (
        <div>
            <ul className="tabs_label voli_tabella_container">
                <li onClick={this.props.onCurrentChoosen.bind(null,'partenze')}  className={classesPartenze}><FormattedMessage id='Partenze'/></li>
                <li onClick={this.props.onCurrentChoosen.bind(null,'arrivi')}  className={classesArrivi}><FormattedMessage id='Arrivi'/></li>
            </ul>
        </div>
    )
  }
})

var VoliFooter = React.createClass({
  render: function() {
    return (
        <div className="last_info">
            <p><FormattedMessage id='orari di volo aggiornati alle '/>{this.props.aggiornamento}</p>
            <span className="raggiungere">
                <FormattedMessage id="Raggiungere l'aeroporto in "/>
                <a href="http://www.aeroportoditorino.it/en/tomove/parking-transport/by-car" className="btn_partenze" target="_blank"><FormattedMessage id='auto'/></a>
                    <a href="http://www.aeroportoditorino.it/en/tomove/parking-transport/by-bus" className="btn_partenze" target="_blank"><FormattedMessage id='bus'/></a>
                        <a href="http://www.aeroportoditorino.it/en/tomove/parking-transport/by-train" className="btn_partenze" target="_blank"><FormattedMessage id='treno'/></a>
                {/*
                <a href="http://www.aeroportoditorino.it/it/tofly/voli/partenze-arrivi?orario=oggi" className="btn_partenze">Partenze di oggi</a>
                <a href="http://www.aeroportoditorino.it/it/tofly/voli/partenze-arrivi?orario=domani&set=partenze" className="btn_partenze">Partenze di domani</a>
                */}
            </span>
            <a href="http://www.aeroportoditorino.it/it/tofly/voli/orario-generale"  className="btn_link" target="_blank"><FormattedMessage id='Orario Generale'/></a>
        </div>
    )
  }
})




const Voli = React.createClass({
    getInitialState: function() {
      return { partenzeArrivi: 'partenze', data: {}};
    },

  loadVoliFromServer: function() {
      axios.get(this.props.url)
         .catch(function (response){
            if (response instanceof Error) {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', response.message);
            } else {
              // The request was made, but the server responded with a status code that falls out of the range of 2xx
              console.log(response.status);
          }})
          .then( (response) =>{
              this.setState({data: response.data})
         })
  },

  componentDidMount: function() {
    this.loadVoliFromServer();
    //setInterval(this.loadVoliFromServer, this.props.pollInterval);
  },

  handleSceltaCurrent: function(current){
      console.log('p/a', current)
      this.setState({partenzeArrivi : current})

  },
  render: function() {
      var voli = []
      var aggiornamento = ''
      if(typeof this.state.data.partenze !== 'undefined'){
          voli = this.state.data[this.state.partenzeArrivi].slice(0,4)
          aggiornamento = this.state.data.aggiornamento.split(/alle/).pop().trim()
          console.log(aggiornamento)
      }
    return (

      <div className="widget_voli">
        <div className="title-4">
            <h2><FormattedMessage id='orario voli'/></h2>
            <h3><FormattedMessage id='Aeroporto di Torino'/></h3>
            <p><FormattedMessage id='In collaborazione con '/> <a href="http://www.aeroportoditorino.it/it/sagat" target="_blank">Sagat S.p.a.</a></p>
        </div>
        <VoliTabs partenzeArrivi={this.state.partenzeArrivi} onCurrentChoosen={this.handleSceltaCurrent}/>
        <VoliTable partenzeArrivi={this.state.partenzeArrivi} voli={voli} />
        <VoliFooter aggiornamento={aggiornamento} />

      </div>
    );
  }
});

export default Voli
