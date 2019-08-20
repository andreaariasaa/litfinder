import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


class AddEvent extends Component {
	
   constructor(props) {
       super(props);
		 
       this.state = {
			id: this.props.match.params.id,
			user: ''
       };
     }
	
  	componentWillMount() {
  		this.getUser()
  	}
	
	getUser(){
	 	axios.get(`http://localhost:3000/api/accounts/${this.state.id}`)
			.then(response => {
				this.setState({user: response.data}, () => 
				{
					
				});
			}).catch(err => console.log(err));
	}
	
	addEvent(newEvent){
		axios.request({
			method:'post',
			url:'http://localhost:3000/api/events',
			data: newEvent
		}).then(response => {
			this.props.history.push(`/${this.state.id}/MapView`);
		}).catch(err => console.log(err));
	}
	
	onSubmit(e){
		const newEvent = {
			name: this.refs.name.value,
			description: this.refs.description.value,
			address: this.refs.address.value,
			password: this.refs.password.value,
			user: this.state.user
		}
		this.addEvent(newEvent);
		e.preventDefault();
	}
	render() {
		return (
			<div>
				<center>
					<ul>
						<li>
							<Link to={`/${this.state.id}/MapView`}>Map view</Link>
						</li>
						<li>
							<Link to={`/${this.state.id}/ListView`}>List view</Link>
						</li>
					</ul>
					<h1>Add Event</h1>
					<form onSubmit={this.onSubmit.bind(this)}>
						<p>*Name: </p><input type="text" name="name" ref="name"/><br />
						<p>*Description: </p><textarea name="description" ref="description"></textarea><br />
						<p>*Address: </p><textarea name="address" ref="address"></textarea><br />
						<p>Password: </p><input type="text" name="password" ref="password"></input>
						<p>*Required</p>
						<br /><button type="submit">Submit</button>
					</form>
				</center>
			</div>
		)
	}
}


export default AddEvent;