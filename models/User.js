const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const moment = require('moment');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    // unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  joinDate: {
    type: String,
    default: moment().format('LL').toString()
  },
  locations: {
    type: [Schema.Types.ObjectId],
    ref: 'Location'
  },
  sightings: {
    type: [Schema.Types.ObjectId],
    ref: 'Sighting'
  },
});

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    })
  })
})

module.exports = mongoose.model('User', UserSchema);
