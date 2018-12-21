const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
};

exports.resolvers = {

  Query: {

    getCurrentUser: async (root, args, { currentUser, User }) => {
      if (!currentUser) {
        return null;
      }
      const user = await User.findOne({ username: currentUser.username });
      return user;
    },

    getAllLocations: async (root, { username }, { Location }) => {
      const allLocations = await Location.find({ username }).sort({ locationname: 1 });
      return allLocations;
    },

    getLocation: async (root, { _id }, { Location }) => {
      const location = await Location.findOne({ _id });
      return location;
    },

    getSighting: async (root, { _id }, { Sighting }) => {
      const sighting = await Sighting.findOne({ _id });
      return sighting;
    },

    getAllSightings: async (root, { username }, { Sighting }) => {
      const allSightings = await Sighting.find({ username }).sort({createdDate: 'desc'});
      return allSightings;
    },

    getLocationSightings: async (root, { locationname, username }, { Sighting }) => {
      const locationSightings = await Sighting.find({ locationname, username }).sort({ createdDate: 'desc' });
      return locationSightings;
    },

    getLocationMushroomSightings: async (root, { commonname, locationname, username }, { Sighting }) => {
      const locationMushroomSightings = await Sighting.find({ commonname, locationname, username }).sort({ createdDate: 'desc'});
      return locationMushroomSightings;
    },

    getAllMushrooms: async (root, { username }, { Mushroom }) => {
      const allMushrooms = await Mushroom.find({ username }).sort({ commonname: 1 });
      return allMushrooms;
    },

    searchSightings: async (root, { searchTerm, username }, { Sighting }) => {
      if (searchTerm) {
        const searchResults = await Sighting.find({
          $text: { $search: searchTerm }, username
        }, {
          score: { $meta: "textScore" }
        }).sort({
          score: { $meta: "textScore" }
        });
        return searchResults;
      }
      else {
        const sightings = await Sighting.find({ username });
        return sightings;
      }
    },
  },

  Mutation: {

    addLocation: async (root, { locationname, address, username }, { Location }) => {
      const newLocation = await new Location({
        locationname,
        address,
        username
      }).save();
      return newLocation;
    },

    addSighting: async (root, { username, locationname, commonname, latinname, imageUrl, imageCredit, date, latitude, longitude }, { Sighting }) => {
      const newSighting = await new Sighting({
        username,
        locationname,
        commonname,
        latinname,
        imageUrl,
        imageCredit,
        date,
        latitude,
        longitude
      }).save();
      return newSighting;
    },

    addMushroom: async (root, { username, commonname, latinname, imageUrl }, { Mushroom }) => {
      const newMushroom = await new Mushroom({
        username,
        commonname,
        latinname,
        imageUrl
      }).save();
      return newMushroom;
    },

    deleteSighting: async (root, { _id }, { Sighting }) => {
      const sighting = await Sighting.findOneAndRemove({ _id });
      return sighting;
    },

    updateSighting: async (root, { _id, locationname, commonname, latinname, imageUrl, imageCredit, date, latitude, longitude }, { Sighting }) => {
      const updatedSighting = await Sighting.findOneAndUpdate(
        { _id },
        { $set: { locationname, commonname, latinname, imageUrl, imageCredit, date, latitude, longitude }},
        { new: true }
      );
      return updatedSighting;
    },

    signupUser: async (root, { username, email, password }, { User }) => {
      const user = await User.findOne({ username });
      if (user) {
        throw new Error('User already exists');
      }
      const newUser = await new User({
        username,
        email,
        password
      }).save();
      return { token: createToken(newUser, process.env.SECRET, '1hr')}
    },

    signinUser: async (root, { username, password }, { User }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('User not found');
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error('Invalid password');
      }
      return { token: createToken(user, process.env.SECRET, '1hr')};
    },
  }
};
