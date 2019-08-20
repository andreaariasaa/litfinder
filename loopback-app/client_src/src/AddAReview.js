import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class AddAReview extends Component {
	
	constructor(props){
		super(props);
		
		this.state = {
			title: '',
			id: this.props.match.params.aid
		}
	}
	
	componentWillMount(){
		this.getEvent();
	}
	
	getEvent(){
		let eventId = this.props.match.params.id;
	 	axios.get(`http://localhost:3000/api/events/${eventId}`)
			.then(response => {
				this.setState({title: response.data.name}, () => 
				{
					
				});
			}).catch(err => console.log(err));
	}
	
	addReview(newReview) {
		axios.request({
			method:'post',
			url:'http://localhost:3000/api/Reviews',
			data: newReview
		}).then(response => {
			this.props.history.push(`/${this.state.id}/events/${this.props.match.params.id}`);
		}).catch(err => console.log(err));
	}
	
	onSubmit(e){
		const newReview = {
			Author: this.refs.author.value,
			Content: this.refs.content.value,
			Rating: this.refs.rating.value,
			EventId: this.state.title
		}
		this.addReview(newReview);
		e.preventDefault();
	}
	render() {
		return (
			<div>
				<ul>
					<li>
						<Link to={`/${this.state.id}/MapView`}>Map view</Link>
					</li>
					<li>
						<Link to={`/${this.state.id}/ListView`}>List view</Link>
					</li>
					<li>
						<Link to={`/${this.state.id}/AddEvent`}>Add an Event</Link>
					</li>
				</ul>
				<center>
					<h1>Add a review</h1>
					<form onSubmit={this.onSubmit.bind(this)}>
						<p>Author: </p><input type="text" name="author" ref="author"/><br />
						<p>Review: </p><textarea name="content" ref="content"></textarea><br />
						<p>Rating from 1 to 5: </p><input type="text" name="rating" ref="rating"/><br />
						<br /><button type="submit">Submit</button>
					</form>
				</center>
			</div>
		)
	}
}


export default AddAReview;