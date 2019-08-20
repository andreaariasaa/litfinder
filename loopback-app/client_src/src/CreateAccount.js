import React, { Component } from 'react';
import axios from 'axios';

class CreateAccount extends Component {
	
	constructor(props){
		super(props)
		
		this.state = {
			usernameTaken: false
		}
	}
	
	checkUsername(user) {
		axios.get(`http://localhost:3000/api/accounts/?filter[where][username]=${user.username}`)
			.then(response =>{
				this.setState({usernameTaken: true});
			}).catch(err => this.addUser(user));
	}

	addUser(user){
		axios.request({
			method:'post',
			url:'http://localhost:3000/api/accounts',
			data: user
		}).then(response => {
			this.props.history.push('/');
		}).catch(err => console.log(err));
	}
	
	onSubmit(e){
		const user = {
			email: this.refs.email.value,
			username: this.refs.username.value,
			password: this.refs.password.value
		}
		this.checkUsername(user);
		e.preventDefault();
	}
	
	render() {
		return (
			<div>
				<center>
					<h1>Login</h1>
					<form onSubmit={this.onSubmit.bind(this)}>
						<p>Email: </p><input tpye="text" name="email" ref='email'/><br />
						<p>Username: </p><input type="text" name="username" ref="username"/><br />
						<p>Password: </p><input type="password" name="password" ref="password"></input>
						<br />
						<br /><button type="submit">Submit</button>
						<br /><br />
						{this.state.usernameTaken ?
							"That username is already taken"
							:
							""
						}
					</form>
				</center>
			</div>
		)
	}
}

export default CreateAccount;