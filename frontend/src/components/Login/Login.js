import React, { Component } from 'react';

import './Login.css';

class Login extends Component {
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
      </div>
    );
  }
}

export default Login;
