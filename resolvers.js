const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn })
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

    getAllMushrooms: async (root, { username }, { Mushroom }) => {
      const allMushrooms = await Mushroom.find({ username }).sort({ commonname: 1 });
      return allMushrooms;
    },

    getMushroom: async (root, { _id }, { Mushroom }) => {
      const mushroom = await Mushroom.findOne({ _id });
      return mushroom;
    },

    getLocationMushrooms: async (root, { locationname }, { Mushroom }) => {
      const locationMushrooms = await Mushroom.find({ locationname }).sort({ commonname: 1 });
      return locationMushrooms;
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

    addMushroom: async (root, { commonname, latinname, locationname, imageUrl, date, coordinates, username }, { Mushroom }) => {
      const newMushroom = await new Mushroom({
        commonname, 
        latinname, 
        locationname, 
        imageUrl, 
        date, 
        coordinates,
        username
      }).save();
      return newMushroom;
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
      if(!user) {
        throw new Error('User not found');
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error('Invalid password');
      }
      return { token: createToken(user, process.env.SECRET, '1hr')}
    },
  }
}