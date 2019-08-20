import React, { Component } from 'react';
import {Link} from 'route-router-dom';

class MeetupItem extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			item: props.item
		}
	}
	
	render() {
		return (
			<li className="collection=item">{this.state.item.name}</li>
		)
	}
}

export default MeetupItem