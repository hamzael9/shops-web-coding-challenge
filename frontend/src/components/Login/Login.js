import React, { Component } from 'react';

import {Redirect} from 'react-router-dom';

import './Login.css';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      logged: false
    };
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentWillMount() {
    if (localStorage.getItem('token')) {
      this.setState ( {
        logged: true
      } );
    }
  }

  submitHandler(ev) {
    ev.preventDefault();
    console.log('Submitting form ...');

    let payload = JSON.stringify({ email: "hamza@gmail.com", password: "passpass" });
    fetch ('http://localhost:3000/api/v1/users/sign-in/', {
      headers: {
      'Content-Type': 'application/json'
      },
      method: 'POST',
      body: payload
    })
    .then ( (resp) => {
      if (resp.status === 200) {
        resp.json().then( (data) => {
          console.log('data of login in :');
          console.log(data);
          localStorage.setItem('token', data.token);
          this.props.history.push('/nearby');
        }).catch( (err) => {
          console.log('problem in jsonifying login response')
        });
      } else {
        console.error('Not authorized !');
      }
    } )
    .catch ( (err) => { console.error('Error fetching ...'); } );

  }

  render() {
    return (
      <div className="Login">
        <h1>Login</h1>
        <form onSubmit={this.submitHandler}>
            <div className="field">
              <label htmlFor="email">E-mail: </label>
              <input type="text" name="email" />
            </div>
            <div className="field">
              <label htmlFor="password">Password: </label>
              <input type="password" name="password" />
            </div>
            <div className="field">
              <button type="submit">Sign-in</button>
            </div>
        </form>
        { this.state.logged ? <Redirect from="/login" to="/shops/nearby" /> : null }
      </div>

    );
  }
}

export default Login;
