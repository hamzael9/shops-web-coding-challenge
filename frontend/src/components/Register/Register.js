import React, { Component } from 'react';

import {Redirect} from 'react-router-dom';

import './Register.css';

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: ""
    };
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentWillMount() {
  }

  submitHandler(ev) {
    ev.preventDefault();
    console.log('Submitting form ...');

    let name = this.nameInput.value;
    let email = this.emailInput.value;
    let password = this.passwordInput.value;

    if (password.length < 8) {
      this.passwordInput.value = "";
      this.passwordInput.focus();
      return;
    }

    let payload = JSON.stringify({ name: name, email: email, password: password });
    fetch ('http://localhost:3000/api/v1/users/sign-up/', {
      headers: {
      'Content-Type': 'application/json'
      },
      method: 'POST',
      body: payload
    })
    .then ( (resp) => {
      if (resp.status === 200) {
        resp.json().then( (data) => {
          console.log('data of register in :');
          console.log(data);
          this.props.history.push('/signin');
        }).catch( (err) => {
          console.log('problem in jsonifying register response')
        });
      } else {
        console.error('Not authorized !');
        this.setState({
          error: "Server could not register the user with the provided info"
        });
      }
    } )
    .catch ( (err) => { console.error('Error fetching ...'); } );

  }

  render() {
    return (
      <div className="Register">
        <h1>Login</h1>
        <form onSubmit={this.submitHandler}>
            <div className="field">
              <label htmlFor="name">Name: </label>
              <input type="text" name="name" required placeholder="name" ref={(input) => {this.nameInput = input; }}/>
            </div>
            <div className="field">
              <label htmlFor="email">E-mail: </label>
              <input type="email" name="email" required placeholder="valid e-mail" ref={(input) => {this.emailInput = input; }} />
            </div>
            <div className="field">
              <label htmlFor="password">Password: </label>
              <input type="password" name="password" required placeholder="( at lease 8 characters )" ref={(input) => {this.passwordInput = input; }} />
            </div>
            <div className="field">
              <button type="submit">Sign-up</button>
            </div>
        </form>
        <div className={`error-msg ${this.state.error === "" ? 'hidden' : ''}`}>
          <p>{this.state.error}</p>
        </div>
      {localStorage.getItem('token') ? <Redirect from="/signup" to="/shops/nearby" /> : null}
      </div>

    );
  }
}

export default Register;
