import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Switch, Route, Redirect } from 'react-router-dom';


import Menu from './components/Menu/Menu';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
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
          <Route path='/signin' component={Login}/>
          <Route path='/signup' component={Register}/>
          <PrivateRoute authed={localStorage.getItem('token') ? true : false} exact path='/shops/:type' component= {ShopDisplay}/>
          <PrivateRoute authed={localStorage.getItem('token') ? true : false} path='/shops/:type' component= {ShopDisplay}/>
          <Redirect to='/shops/nearby' />
        </Switch>
        </main>
      </div>
    );
  }

}

const PrivateRoute = ({component: Component, authed, ...rest})=>{
  return (
    <Route
    {...rest}
    render={(props) => ((authed === true)) ? <Component {...props} /> : <Redirect to={'/login'} />}
    />
  )
}

export default App;
