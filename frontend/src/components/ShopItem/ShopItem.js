import React, { Component } from 'react';

import './ShopItem.css';

class ShopItem extends Component {
  constructor (props) {
    super(props);
  }

  componentWillUnmount () {
    console.log('Unmounting shop item ');
  }

  likeClickHandler (ev) {
    console.log('like');
    if (!this.props.preferred) {
      fetch (`http://localhost:3000/api/v1/users/shops/liked/${this.props.id}`, { headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}, method: 'POST' })
      .then ( (resp) => {
        if (resp.status === 200) {
          console.log ('Shop Item added to preferred shops !');
          this.props.selfUnmount(this.props.id);
        }
        else {
          console.log(`Status returned ${resp.status}`); }
        } )
      .catch( (err) => {
        console.error(err);
      } );
    }
  }

  dislikeClickHandler (ev) {
    console.log('dislike');
    if (!this.props.preferred) {
      fetch (`http://localhost:3000/api/v1/users/shops/disliked/${this.props.id}`, { headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}, method: 'POST' })
      .then ( (resp) => {
        if (resp.status === 200) {
          console.log ('Shop Item Disliked !');
          this.props.selfUnmount(this.props.id);
        }
        else {
          console.log(`Status returned ${resp.status}`); }
        }   )
      .catch( (err) => { console.error(err); } );
    }
  }

  removeClickHandler (ev) {
    console.log('remove');
    if (this.props.preferred) {
      fetch (`http://localhost:3000/api/v1/users/shops/liked/${this.props.id}`, { headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}, method: 'DELETE' })
      .then ( (resp) => {
        if (resp.status === 200) {
          console.log ('Shop Item removed from preferred shops !');
          this.props.selfUnmount(this.props.id);
        }
        else {
          console.log(`Status returned ${resp.status}`); }
        } )
      .catch( (err) => { console.error(err); } );
    }
  }

  render() {
    return (
      <article className="shop-item">
          <div className="up">
            <h2 className="shop-title">{this.props.name}</h2>
          </div>
          <div className="middle">
            <img className="shop-img" src={this.props.img} alt="" />
          </div>
          <div className="down">
            <div className={this.props.preferred ? "hidden": ""}>
              <button className="shop-btn dislike-btn" onClick={this.dislikeClickHandler.bind(this)}>Dislike</button>
              <button className="shop-btn like-btn" onClick={this.likeClickHandler.bind(this)}>Like</button>
            </div>
            <div className={this.props.preferred ? "": "hidden"}>
              <button className="shop-btn remove-btn" onClick={this.removeClickHandler.bind(this)}>Remove</button>
            </div>
          </div>
      </article>
    );
  }
}

export default ShopItem;
