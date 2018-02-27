import React, { Component } from 'react';

import './ShopDisplay.css';

import ShopItem from '../ShopItem/ShopItem';

class ShopDisplay extends Component {
  constructor(props) {
    console.log('Constructing ShopDisplay ...');
    super(props);

    this.state = {
      filter: this.pathNameToTitle(),
      data: []
    };

    let unlisten = this.props.history.listen((location, action) => {
      console.log('history refresh');
      if (location.pathname.includes('preferred') || location.pathname.includes('nearby')) {
        this.refreshShops(location.pathname);
      }
    });
    this.stopHistoryUnlisten = unlisten;
  }

  componentDidMount() {
    console.log('ShopDisplay did mount');

    this.refreshShops(this.props.location.pathname);
  }

  componentWillUnmount() {
    console.log('ShopDisplay Will unmount');
    this.stopHistoryUnlisten();
  }

  pathNameToTitle () {
    if (this.props.location.pathname.includes('nearby')) {
      return "Nearby"
    } else if (this.props.location.pathname.includes('preferred')) {
      return "Preferred";
    } else {
      return "";
    }
  }

  handleItemUnmount (id) {
    console.log(`Removing item ${id}`);
    let res = this.state.data.filter (item => {
      return item.props.id !== id;
    });
    this.setState({
      ...this.state,
      data: res
    })
  }

  fetchShops (url,x,y) {
    let shops = [];
    let isPreferred = !url.includes('nearby');
    fetch(url, {
      method: 'GET',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then ( (resp) =>  resp.json() )
    .then ( (data) => {
      console.log(data);
      for (let s of data) {
        shops.push (<ShopItem key={s._id} id={s._id} name={s.name} img={s.picture} preferred={isPreferred} selfUnmount={this.handleItemUnmount.bind(this)}/>);
      }

      this.setState( {
        filter: this.pathNameToTitle(),
        data: shops
      });

    })
    .catch( (err) => {
      console.error(err);
    });
  }

  refreshShops (mode) {
    let url = "";

    if (!localStorage.getItem('token')) {
      this.props.history.push('/signin');
    }

    if (mode === '/shops/nearby') {
      console.log('nearby');

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( (position) => {
          console.log(position.coords.longitude, position.coords.latitude);
          url = `http://localhost:3000/api/v1/shops/nearby?x=${position.coords.longitude}&y=${position.coords.longitude}`;
          this.fetchShops(url);
        }, (err) => {
          console.log('No permission for geolocation.');
          url = `http://localhost:3000/api/v1/shops/nearby`;
          this.fetchShops(url);
        });
      } else {
        console.log("Geolocation is not supported.");
        url = `http://localhost:3000/api/v1/shops/nearby`;
        this.fetchShops(url);
      }

    } else if (mode === '/shops/preferred') {
      console.log('preferred');
      url = 'http://localhost:3000/api/v1/users/shops/liked';
      this.fetchShops(url);
    } else {
      this.props.history.push('/shops/nearby');
    }
  }

  render() {
    return (
      <div className="ShopDisplay">
        <div>
          <h1 className="title">{`${this.state.filter} Shops`}</h1>
        </div>
        <div>
          { this.state.data  }
        </div>
      </div>
    );
  }
}

export default ShopDisplay;
