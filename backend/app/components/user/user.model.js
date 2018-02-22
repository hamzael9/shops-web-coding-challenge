const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  password: { type: String, default: '' },
  liked_shops : [{
    shopId: { type : Schema.ObjectId, ref: 'Shop' },
    likedTime: {type: Date, default: Date.now}
  }]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
