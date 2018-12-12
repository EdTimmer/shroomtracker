const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SightingSchema = new Schema({
  commonname: {
    type: String,
    required: true,
  },
  locationname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
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
  }
})

module.exports = mongoose.model('Sighting', SightingSchema);