import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ReviewItem from './ReviewItem'

class EventDetails extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			details:'',
			reviews:[],
			id: this.props.match.params.aid,
			triedDeleting: false
		}
	}
	
	componentWillMount() {
		this.getEvent()
	}
	
	
	getReviews(){
		axios.get(`http://localhost:3000/api/reviews?filter[where][EventId]=${this.state.details.name}`)
			.then(response => {
				this.setState({reviews: response.data}, () =>
			{
				
			});
		}).catch(err => console.log(err));
	}
	
	getEvent(){
		let eventId = this.props.match.params.id;
	 	axios.get(`http://localhost:3000/api/events/${eventId}`)
			.then(response => {
				this.setState({details: response.data}, () => 
				{
					this.getReviews()
				});
			}).catch(err => console.log(err));
	}
	
	onDelete(){
		if(this.state.id === this.state.details.user.id){
			let eventId = this.state.details.id;
			axios.delete(`http://localhost:3000/api/events/${eventId}`)
				.then(respond => {
					this.props.history.push('/');
				}).catch(err => console.log(err));
		}else{
			this.setState({triedDeleting: true})
		}
	}
	
	render() {
		var totalScore = 0
  		const reviewItems = this.state.reviews.map((review, i) => {
  			totalScore += review.Rating
			return(
  				<ReviewItem key={review.id} item={review} />
  			)
  	 	})
		const revLength = this.state.reviews.length;
		const avgRat = totalScore/revLength
		const roundedRat = (Math.round(avgRat*10))/10.0
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
						<li>
							<Link to={`/${this.state.id}/AddEvent`}>Add an Event</Link>
						</li>
					</ul>
					<h1>{this.state.details.name}</h1>
					<Link to={`/${this.state.id}/events/reviews/${this.state.details.id}`}>Add a review</Link>
					<ul>
						<li>
							{this.state.details.description}
						</li>
						<li>
							{this.state.details.address}
						</li>
					</ul>
					
					<Link to={`/${this.state.id}/events/edit/${this.state.details.id}`}>Edit</Link>
					<br />
					<br />
					<h2>Average Rating: {roundedRat}</h2>
				
					<h3><i>Reviews</i></h3>
					{reviewItems}
					
					<button onClick={this.onDelete.bind(this)}>Delete</button><br />
					{this.state.triedDeleting? "you do not have permission to delete this event" : ""}
				</center>
			</div>
		)
	}
}

export default EventDetails;