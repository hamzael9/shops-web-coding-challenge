import React, { Component } from 'react';

import './ShopDisplay.css';

import ShopItem from '../ShopItem/ShopItem';

class ShopDisplay extends Component {
  constructor(props) {
    console.log('Constructing Shop Display ...');
    super(props);
    this.state = {
      data: []
    }
    //this.handleItemUnmount = this.handleItemUnmount.bind(this);
  }

  handleItemUnmount (id) {
    console.log('Removing item ' + id);
    let res = this.state.data.filter (item => {
      return item.props.id !== id;
    });
    this.setState({
      data: res
    })
  }

  componentDidMount() {
    this.getShops("/shops/nearby");
    this.props.history.listen((location, action) => {
      this.getShops(location.pathname);
    });
  }

  getShops (mode) {

        let shops = [];
        if (mode === '/shops/nearby') {
          console.log('nearby');
          fetch('http://localhost:3000/api/v1/shops/nearby', {
            method: 'GET',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          })
          .then ( (resp) =>  resp.json() )
          .then ( (data) => {

            console.log(data);
            for (let s of data) {
              shops.push (<ShopItem key={s._id} id={s._id} name={s.name} img={s.picture} preferred={false} selfUnmount={this.handleItemUnmount.bind(this)}/>);
            }

            this.setState( {
              data: shops
            });

          })
          .catch( (Err) => {
            console.log(Err);
          });
        } else if (mode === '/shops/preferred') {
          console.log('preferred');
          fetch('http://localhost:3000/api/v1/users/shops/liked', {
            method: 'GET',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          })
          .then ( (resp) =>  resp.json() )
          .then ( (data) => {

            console.log(data);
            for (let s of data) {
              shops.push (<ShopItem key={s._id} id={s._id} name={s.name} img={s.picture} preferred={true} selfUnmount={this.handleItemUnmount.bind(this)}/>);
            }

            this.setState({
              data: shops
            });

          })
          .catch( (Err) => {
            console.log(Err);
          });
        }
  }

  render() {
    return (
      <div className="ShopDisplay">
        <div>
          <h1>{`${this.props.match.params.type} Shops`}</h1>
        </div>
        <div>
          { this.state.data  }
        </div>
      </div>
    );
  }
}

export default ShopDisplay;
