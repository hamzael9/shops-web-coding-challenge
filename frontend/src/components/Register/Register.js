import React, { Component } from 'react';

import {Redirect} from 'react-router-dom';

import './Register.css';

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
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
              <input type="text" name="name" ref={(input) => {this.nameInput = input; }}/>
            </div>
            <div className="field">
              <label htmlFor="email">E-mail: </label>
              <input type="text" name="email" ref={(input) => {this.emailInput = input; }} />
            </div>
            <div className="field">
              <label htmlFor="password">Password: </label>
              <input type="password" name="password" ref={(input) => {this.passwordInput = input; }} />
            </div>
            <div className="field">
              <button type="submit">Sign-in</button>
            </div>
        </form>
      </div>

    );
  }
}

export default Register;
