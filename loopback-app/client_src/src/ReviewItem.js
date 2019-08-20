import React, { Component } from 'react';

class ReviewItem extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			item: props.item
		}
	}
	
	render() {
		return (
			<div>
				<center>
					<h4>{this.state.item.Author}</h4>
					Rating: {this.state.item.Rating}
					<br />
					Review: {this.state.item.Content}
				</center>
			</div>
		)
	}
}

export default ReviewItem