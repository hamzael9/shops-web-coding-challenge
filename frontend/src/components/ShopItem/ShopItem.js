import React, { Component } from 'react';

import './ShopItem.css';

class ShopItem extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <article className="shop-item">
          <div className="up">
            <h2 className="shop-title">{this.props.name}</h2>
          </div>
          <div className="middle">
            <img className="shop-img" src="" alt="" />
          </div>
          <div className="down">
            <button className="shop-btn dislike-btn">Dislike</button>
            <button className="shop-btn like-btn">Like</button>
          </div>
      </article>
    );
  }
}

export default ShopItem;
