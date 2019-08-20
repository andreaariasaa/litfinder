import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class EventItem extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			item: props.item,
			id: props.id
		}
	}
	
	render() {
		return (
			<center>
				<li className="collection=item">
					<Link to={`/${this.state.id}/events/${this.state.item.id}`}>{this.state.item.name}</Link>
				</li>
			</center>
		)
	}
}

export default EventItem