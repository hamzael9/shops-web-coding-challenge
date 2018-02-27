import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import './Menu.css';

class Menu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      logged: false
    }
  }

  render() {
    return (
      <nav className="App-menu">
      <ul>
      <li className="main">
        <div>
          <Link to="/shops/nearby">Nearby Shops</Link>
          <Link to="/shops/preferred" >Preferred Shops</Link>
        </div>
      </li>
      <li className="side">
        <div>
          <Link to="/signin">Sign-in</Link>
          <Link to="/signin" onClick={()=>{localStorage.removeItem("token")}}>Sign-out</Link>
          <Link to="/signup">Sign-up</Link>
        </div>
      </li>
      </ul>
      </nav>
    );
  }

}

export default Menu;
