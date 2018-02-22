import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Switch, Route } from 'react-router-dom';


import Menu from './components/Menu/Menu';
import Login from './components/Login/Login';
import ShopDisplay from './components/ShopDisplay/ShopDisplay';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Menu />
        </header>
        <main>
        <Switch>
          <Route path='/login' component={Login}/>
          <Route exact path='/' render={() => <ShopDisplay type="Nearby" />}/>
          <Route path='/preferred' render={() => <ShopDisplay type="Preferred" />}/>
        </Switch>
        </main>
      </div>
    );
  }
}

export default App;
