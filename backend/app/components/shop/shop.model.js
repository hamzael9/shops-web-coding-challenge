
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ShopSchema = new Schema({
  picture: {type: String, default: ''},
  name: {type: String, default: ''},
  email: {type: String},
  city: {type: String},
  location: {
    type: {type: String, default: 'Point'},
    coordinates: [Number]
  }
});

const Shop = mongoose.model('Shop', ShopSchema);

module.exports = Shop;
