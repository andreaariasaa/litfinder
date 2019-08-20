import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class LoginPage extends Component {
	
	constructor(props) {
		super(props)
		
		this.state = {
			account:[],
			wrongUsername: false,
			wrongPassword: false
		}
	}
	
	checkUser(user){
		axios.get(`http://localhost:3000/api/accounts/?filter[where][username]=${user.username}`)
			.then(response => {
				this.setState({account: response.data}, () => {
					if (this.state.account[0].password === user.password) {
						this.props.history.push(`/${this.state.account[0].id}/MapView`);
					}else{
						this.setState({wrongPassword: true})
					}
				})

			}).catch(err => this.setState({wrongUsername: true}))
	}
	
	onSubmit(e){
		const user = {
			username: this.refs.username.value,
			password: this.refs.password.value
		}
		this.checkUser(user);
		e.preventDefault();
	}
	
	render() {
		return (
			<div>
				<center>
					<h1>Login</h1>
					<form onSubmit={this.onSubmit.bind(this)}>
						<p>Username: </p><input type="text" name="username" ref="username"/><br />
						<p>Password: </p><input type="password" name="password" ref="password"></input>
						<br /><br /><button type="submit">Submit</button>
					</form>
					<br />
					<Link to={'/CreateAccount'}>Create Account</Link>
					<br />
					<br />
					{this.state.wrongUsername ? 
						"we don't recognize that username"
						:
						""
					}
					{this.state.wrongPassword ?
						"wrong username or password"
						:
						""
					}
				</center>
			</div>
		)
	}
}

export default LoginPage;