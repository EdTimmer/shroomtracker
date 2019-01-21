const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SightingSchema = new Schema({  
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
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  location: {
    type: Schema.Types.ObjectId,
    ref: 'Location'
  },
  mushroom: {
    type: Schema.Types.ObjectId,
    ref: 'Mushroom'
  }
});

// SightingSchema.index({
//   "$**": "text"
// })

module.exports = mongoose.model('Sighting', SightingSchema);
