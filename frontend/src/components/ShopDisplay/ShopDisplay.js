import React, { Component } from 'react';

import './ShopDisplay.css';

import ShopItem from '../ShopItem/ShopItem';

class ShopDisplay extends Component {
  constructor(props) {
    console.log('Constructing Shop Display ...');
    super(props);
  }

  createShops() {
    console.log('Creating shops ...')
    let shops = [];
    if (this.props.type.toLowerCase() === 'nearby') {
      for (let i = 0 ; i < 20 ; i++) {
        shops.push(<ShopItem key={i.toString()} name={`Shop ${i}`} />);
      }
    } else if (this.props.type.toLowerCase() === 'preferred') {
      for (let i = 0 ; i < 20 ; i++) {
        shops.push(<ShopItem key={i.toString()} name={`My Shop ${i}`} />);
      }
    }
    return shops;
  }

  render() {
    return (
      <div className="ShopDisplay">
        <div>
          <h1>{`${this.props.type} Shops`}</h1>
        </div>
        <div>
          {this.createShops()}
        </div>
      </div>
    );
  }
}

export default ShopDisplay;
