import React from 'react';
import classNames from 'classnames';

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
                            <th>Data</th>
                            <th>Ora</th>
                            <th>{this.props.partenzeArrivi == 'partenze'? 'Destinazione':'Provenienza'}</th>
                            <th>Volo</th>
                            <th>{this.props.partenzeArrivi == 'partenze'? 'imbarco':'note'}</th>
                        </tr>
                    </thead>	
                    <tbody>
                        {voliNodes}
                        {/*
                        <Volo data="10-02" ora="16:31" destinazione="Parigi" volo="123456" imbarco="in corso" />
                        <Volo data="10-02" ora="16:31" destinazione="Parigi" volo="123456" imbarco="in corso" />
                        <Volo data="10-02" ora="16:31" destinazione="Parigi" volo="123456" imbarco="in corso" />
                        */}
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
        <div class="tabs">
            <ul className="tabs_label voli_tabella_container">
                <li onClick={this.props.onCurrentChoosen.bind(null,'partenze')}  className={classesPartenze}>Partenze</li>
                <li onClick={this.props.onCurrentChoosen.bind(null,'arrivi')}  className={classesArrivi}>Arrivi</li>
            </ul>
        </div>        
    )
  }
})

var VoliFooter = React.createClass({
  render: function() {
    return (
        <div className="last_info">
            <p>{this.props.aggiornamento}</p>
            <span className="raggiungere">
                Raggiungere l'aeroporto in 
                <a href="http://www.aeroportoditorino.it/en/tomove/parking-transport/by-car" className="btn_partenze" target="_blank">auto</a>
                    <a href="http://www.aeroportoditorino.it/en/tomove/parking-transport/by-bus" className="btn_partenze" target="_blank">bus</a>
                        <a href="http://www.aeroportoditorino.it/en/tomove/parking-transport/by-train" className="btn_partenze" target="_blank">treno</a>
                {/* 
                <a href="http://www.aeroportoditorino.it/it/tofly/voli/partenze-arrivi?orario=oggi" className="btn_partenze">Partenze di oggi</a>
                <a href="http://www.aeroportoditorino.it/it/tofly/voli/partenze-arrivi?orario=domani&set=partenze" className="btn_partenze">Partenze di domani</a>
                */}
            </span>
            <a href="http://www.aeroportoditorino.it/it/tofly/voli/orario-generale"  className="btn_link" target="_blank">Orario Generale</a>
        </div>
    )
  }
})




const Voli = React.createClass({
    getInitialState: function() {
      return { partenzeArrivi: 'partenze', data: {}};
    },
    
  loadVoliFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: true,
      success: function(data) {
        this.setState({data: data});
        
    }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
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
          aggiornamento = this.state.data.aggiornamento
      }
    return (
        
      <div className="widget widget_voli">
        <div className="title-4">
            <h2>orario voli</h2>
            <h3>Aeroporto di Torino</h3>
            <p>In collaborazione con <a href="http://www.aeroportoditorino.it/it/sagat" target="_blank">Sagat S.p.a.</a></p>
        </div>
        <VoliTabs partenzeArrivi={this.state.partenzeArrivi} onCurrentChoosen={this.handleSceltaCurrent}/>
        <VoliTable partenzeArrivi={this.state.partenzeArrivi} voli={voli} />
        <VoliFooter aggiornamento={aggiornamento} />
            
      </div>
    );
  }
});

export default Voli



