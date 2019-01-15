const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  locationname: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  sightings: [
    {
      type: [Schema.Types.ObjectId],
      ref: 'Sighting'
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Location', LocationSchema);
