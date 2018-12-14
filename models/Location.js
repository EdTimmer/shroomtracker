const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  locationname: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Location', LocationSchema);
