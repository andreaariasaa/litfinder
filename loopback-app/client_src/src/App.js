import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GoogleMapReact from 'google-map-react';
import { config } from 'react-loopback';
config.set('baseUrl', 'http://0.0.0.0:3000/explorer/');
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;

 
class SimpleMap extends Component {
   constructor(props) {
       super(props);
		 
       this.state = {
         latitude: null,
         longitude: null,
         error: null,
			addEvent: false
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
    return (
      // Important! Always set the container height explicitly
      	<div style={{ height: '100vh', width: '100%' }}>
		 		<button onClick={this.addAnEvent}>
  	  				Add an event
		 		</button>
		 		{console.log(this.state.addEvent)}
		 		{this.state.addEvent ? 
					<form action="/addpost" method="POST">
		  				<p>Title: </p><input type="text" name="title" /><br />
		  				<p>Description content: </p><textarea name="content"></textarea><br />
		  				<br /><button type="submit">Submit</button>
					</form>
        			: 
					<GoogleMapReact
      	 	 		bootstrapURLKeys={{ key: 'AIzaSyCi1nGKewpDe_ZODtVOfHsP7lVBm29cX-s' }}
       	  			defaultCenter={this.props.center}
       	  			defaultZoom={this.props.zoom}
						center={{
							lat: this.state.latitude,
							lng: this.state.longitude
		 	  			}}
     				> 
      				<AnyReactComponent
       	  	 			lat={this.state.latitude}
        	 				lng={this.state.longitude}
        	 	  			text={"Andrea's House"}
       				/>
     				</GoogleMapReact>
				}
      	</div>	
    );
  }
}
 

export default SimpleMap;

