const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MushroomSchema = new Schema({
  commonname: {
    type: String,
    required: true,
  },
  latinname: {
    type: String
  }
});

module.exports = mongoose.model('Mushroom', MushroomSchema);
