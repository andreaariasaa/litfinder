import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import SimpleMap from './SimpleMap'
import AddEvent from './AddEvent'
import List from './List'
import EventDetails from './EventDetails'
import EditEvent from './EditEvent'
import AddAReview from './AddAReview'
import LoginPage from './LoginPage'
import CreateAccount from './CreateAccount'

class Main extends Component {
	
	render(){
		return(
			<Router>
				<div>
					<Route exact path='/' component={LoginPage} />
					<Route exact path='/CreateAccount' component={CreateAccount} />
					<Route exact path='/:id/MapView' component={SimpleMap} />
					<Route exact path='/:id/AddEvent' component={AddEvent} />
					<Route exact path='/:id/ListView' component={List} />
					<Route exact path='/:aid/events/:id' component={EventDetails} />
					<Route exact path='/:aid/events/edit/:id' component={EditEvent} />
					<Route exact path='/:aid/events/reviews/:id' component={AddAReview} />
				</div>
			</Router>
		)
	}
}

export default Main;

