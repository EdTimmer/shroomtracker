const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MushroomSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  commonname: {
    type: String,
    required: true,
  },
  latinname: {
    type: String
  }
});

module.exports = mongoose.model('Mushroom', MushroomSchema);
