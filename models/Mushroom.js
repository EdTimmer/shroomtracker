const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MushroomSchema = new Schema({
  commonname: {
    type: String,
    required: true
  },
  latinname: {
    type: String
  },
  imageUrl: {
    type: String
  },
  imageCredit: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  locations: [
    {
      type: [Schema.Types.ObjectId],
      ref: 'Location'
    }
  ],
  sightings: [
    {
      type: [Schema.Types.ObjectId],
      ref: 'Sighting'
    }
  ]
});

module.exports = mongoose.model('Mushroom', MushroomSchema);
