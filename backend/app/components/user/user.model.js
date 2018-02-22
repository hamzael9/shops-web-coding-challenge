const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  password: { type: String, default: '' },
  likedShops : [{
    shopId: { type : Schema.Types.ObjectId, ref: 'Shop' },
    likedTime: { type: Date, default: Date.now }
  }],
  dislikedShops : [{
    shopId: { type : Schema.Types.ObjectId, ref: 'Shop' },
    dislikedTime: { type: Date, default: Date.now }
  }]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
