import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class EditEvent extends Component {
	
	constructor(props){
		super(props)
		
		this.state = {
			name:'',
			description:'',
			address:'',
			id:'',
			user:'',
			accountId: this.props.match.params.aid
		}
		
		this.handleInputChange = this.handleInputChange.bind(this);
	}
	
	componentWillMount(){
		this.getEventDetails()
	}
	
	getEventDetails(){
		let eventId = this.props.match.params.id;
	 	axios.get(`http://localhost:3000/api/events/${eventId}`)
			.then(response => {
				this.setState({
					name: response.data.name,
					description: response.data.description,
					address: response.data.address,
					id: response.data.id,
					user: response.data.user
					}, () => 
				{
					//console.log(this.state);
				});
			}).catch(err => console.log(err));
	}
	
	editEvent(newEvent) {
		axios.request({
			method:'put',
			url:`http://localhost:3000/api/events/${this.state.id}`,
			data: newEvent
		}).then(response => {
			this.props.history.push(`/${this.state.accountId}/events/${this.state.id}`);
		}).catch(err => console.log(err));
	}
	
	onSubmit(e){
		const newEvent = {
			name: this.refs.name.value,
			description: this.refs.description.value,
			address: this.refs.address.value
		}
		this.editEvent(newEvent);
		e.preventDefault();
	}
	
	handleInputChange(e){
		const target = e.target;
		const value = target.value;
		const name = target.name;
		
		this.setState({
			[name]: value
		})
	}
	
	render() {
		return (
			
				<div>
					{this.state.accountId === this.state.user.id?
					<div>
						<ul>
							<li>
								<Link to={`/${this.state.accountId}/MapView`}>Map view</Link>
							</li>
							<li>
								<Link to={`/${this.state.accountId}/ListView`}>List view</Link>
							</li>
							<li>
								<Link to={`/${this.state.accountId}/AddEvent`}>Add an Event</Link>
							</li>
						</ul>
						<center>
							<h1>Edit Event</h1>
							<form onSubmit={this.onSubmit.bind(this)}>
								<p>Name: </p><input type="text" name="name" ref="name" value={this.state.name} onChange={this.handleInputChange}/><br />
								<p>Description: </p><textarea name="description" ref="description" value={this.state.description} onChange={this.handleInputChange}></textarea><br />
								<p>Address: </p><textarea name="address" ref="address" value={this.state.address} onChange={this.handleInputChange}></textarea><br />
								<br /><button type="submit">Submit</button>
							</form>
						</center>
					</div>
					: 
					<div>
						You do not have permission to edit this event<br />
						<Link to={`/${this.state.accountId}/events/${this.state.id}`}>Go Back</Link>
					</div>
					}
				</div>
		)
	}
}


export default EditEvent;