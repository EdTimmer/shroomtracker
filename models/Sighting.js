const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SightingSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  locationname: {
    type: String,
    required: true
  },
  commonname: {
    type: String,
    required: true,
  },
  latinname: {
    type: String
  },
  imageUrl: {
    type: String
  },
  date: {
    type: String,
    required: true
  },
  latitude: {
    type: String
  },
  longitude: {
    type: String
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Sighting', SightingSchema);
