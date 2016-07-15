import React from 'react'
//var React = require('react/addons');
//var Label = require('react-bootstrap/Label');
import { Label } from 'react-bootstrap'


module.exports = React.createClass({
	render: function() {
		return (
			<span className="audio-name-label pull-left">{this.props.name}</span>
		);
	}
})