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
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  sightings: [
    {
      type: [Schema.Types.ObjectId],
      ref: 'Sighting'
    }
  ],
  // mushrooms: [
  //   {
  //     type: [Schema.Types.ObjectId],
  //     ref: 'Mushroom'
  //   }
  // ],
});

module.exports = mongoose.model('Location', LocationSchema);
