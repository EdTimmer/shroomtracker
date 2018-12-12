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
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  }  
})

module.exports = mongoose.model('Mushroom', MushroomSchema);