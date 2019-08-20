import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';
import Geocode from 'react-geocode'
import EventItem from './EventItem'
import {Link} from 'react-router-dom';

Geocode.setApiKey('AIzaSyCi1nGKewpDe_ZODtVOfHsP7lVBm29cX-s');

const AnyReactComponent = ({ text }) => <div>{text}</div>;
class SimpleMap extends Component {
   constructor(props) {
       super(props);
		 
       this.state = {
         latitude: null,
         longitude: null,
         error: null,
			addEvent: false,
			events: [],
			id: this.props.match.params.id
       };
		 
		 this.addAnEvent = this.addAnEvent.bind(this);
     }
	  componentDidMount() {
	      navigator.geolocation.getCurrentPosition(
	        (position) => {
				  this.setState({
				      latitude: position.coords.latitude,
				      longitude: position.coords.longitude,
				      error: null,
				   });
	        },
	        (error) => this.setState({ error: error.message }),
	        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
	      );
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
				})
		 }
		 
  static defaultProps = {
    center: {
		lat: 63.68,
		 lng: 101.4
    },
    zoom: 11,
	 //addEvent: false
  };
  
  addAnEvent() {
	  console.log("add event");
	  this.setState({
	  	addEvent: true
	  })
  };
 
 
  render() {
	  const eventItems = this.state.events.map((event, i) => {
		return(
			<EventItem key={event.id} item={event} id={this.state.id}/>
 		)
 	 })
 	 const variable = <AnyReactComponent
		 lat={this.state.latitude}
	  	lng={this.state.longitude}
 		text={<ul>{eventItems}</ul>}
 					/>
						
	// console.log(eventItems)
    return (
      // Important! Always set the container height explicitly
			<div style={{ height: '100vh', width: '100%' }}>
				<ul>
					<li>
						<Link to={`/${this.state.id}/ListView`}>List view</Link>
					</li>
					<li>
						<Link to={`/${this.state.id}/AddEvent`}>Add an event</Link>
					</li>
				</ul>
				<GoogleMapReact
			  		bootstrapURLKeys={{ key: 'AIzaSyCi1nGKewpDe_ZODtVOfHsP7lVBm29cX-s' }}
			 		defaultCenter={this.props.center}
			 		defaultZoom={this.props.zoom}
			 		center={{
			 			lat: this.state.latitude,
			 			lng: this.state.longitude
			 		}}
			 	>       
					{variable}
			 	</GoogleMapReact>
			</div>
	  );	
  }
}
    

 

export default SimpleMap;