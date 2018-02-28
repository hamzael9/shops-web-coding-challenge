import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import './Menu.css';

class Menu extends Component {

  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler (ev) {
    if (ev.target.id === 'signout-link') {
      if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
      }
    }
  }

  render() {
    return (
      <nav className="App-menu">
      <ul>
      <li className="main">
        <div>
          <Link id="nearby-link" to="/shops/nearby" onClick={this.clickHandler} ref={ (l) => { this.nearbyLink = l; }}>Nearby Shops</Link>
          <Link id="preferred-link" to="/shops/preferred" onClick={this.clickHandler} ref={ (l) => { this.preferredLink = l; }}>Preferred Shops</Link>
        </div>
      </li>
      <li className="side">
        <div>
          <Link id="signin-link"  to="/signin" onClick={this.clickHandler} ref={(l) => { this.signinLink = l; }}>Sign-in</Link>
          <Link id="signout-link" to="/signin" onClick={this.clickHandler} ref={(l) => { this.signoutLink = l; }}>Sign-out</Link>
          <Link id="signup-link"  to="/signup" onClick={this.clickHandler} ref={(l) => { this.signupLink = l; }}>Sign-up</Link>
        </div>
      </li>
      </ul>
      </nav>
    );
  }

}

export default Menu;
