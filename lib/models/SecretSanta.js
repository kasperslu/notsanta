const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FriendSchema = new Schema({
  name: String,
  active: {
    type: Boolean,
    default: true,
  },
  assigned: {
    type: String,
    default: null,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

const SecretSantaSchema = new Schema({
  _id: String,
  created: {
    type: Date,
    default: Date.now
  },
  name: String,
  friends: [FriendSchema],
});

module.exports = mongoose.model('SecretSanta', SecretSantaSchema);
