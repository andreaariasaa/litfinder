import React, { Component } from 'react';
import axios from 'axios';
import EventItem from './EventItem';
import {Link} from 'react-router-dom';

class List extends Component {
	
   constructor(props) {
       super(props);
		 
       this.state = {
			events: [],
			id: this.props.match.params.id
       };
     }
	
	componentWillMount(){
		this.getMeetups();
	}
 
	getMeetups(){
	 	axios.get('http://localhost:3000/api/events')
			.then(response => {
				this.setState({events: response.data}, () => 
				{
					//console.log(this.state);
				});
			}).catch(err => console.log(err));
	}
	
	render() {
  		const eventItems = this.state.events.map((event, i) => {
  			return(
  				<EventItem key={event.id} item={event} id={this.state.id}/>
  			)
  	 	})
		return (
			<div>
				<center>
					<ul>
						<li>
							<Link to={`/${this.state.id}/MapView`}>Map view</Link>
						</li>
						<li>
							<Link to={`/${this.state.id}/AddEvent`}>Add an event</Link>
						</li>
					</ul>
					<ul>
						{eventItems}
					</ul>
				</center>
			</div>
		)
	}
}

export default List;