import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import './Menu.css';

class Menu extends Component {

  render() {
    return (
      <nav className="App-menu">
          <Link to="/shops/nearby">Nearby Shops</Link>
          <Link to="/shops/preferred" >Preferred Shops</Link>
          <Link to="/login">Sign-in</Link>
      </nav>
    );
  }

}

export default Menu;
