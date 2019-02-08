const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const templateMushrooms = require('./templateMushrooms');

const { ObjectId } = mongoose.Types;
ObjectId.prototype.valueOf = function () {
  return this.toString();
};

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
      const user = await User.findOne({ username: currentUser.username })
        .populate({
          path: 'locations',
          model: 'Location'
        })
        .populate({
          path: 'sightings',
          model: 'Sighting'
        })
        .populate({
          path: 'mushrooms',
          model: 'Mushroom'
        });
        // .exec();
      return user;
    },

    getMyLocations: async (root, { user }, { Location }) => {
      const myLocations = await Location.find({ user }).sort({createdDate: 'desc'});
      return myLocations;
    },

    getLocation: async (root, { _id }, { Location }) => {
      // console.log('getLocation mutation got called')
      const location = await Location.findOne({ _id })
        .populate({
          path: 'user',
          model: 'User'
        })
        .populate({
          path: 'sightings',
          model: 'Sighting',
          populate: {
            path: 'mushroom',
            model: 'Mushroom'
          }
        });
      return location;
    },

    getMySightings: async (root, { user }, { Sighting }) => {
      const mySightings = await Sighting.find({ user }).sort({createdDate: 'desc'})
        .populate({
          path: 'user',
          model: 'User'
        })
        .populate({
          path: 'location',
          model: 'Location'
        })
        .populate({
          path: 'mushroom',
          model: 'Mushroom'
        });
      return mySightings;
    },

    getSighting: async (root, { _id }, { Sighting }) => {
      const sighting = await Sighting.findOne({ _id })
        .populate({
          path: 'user',
          model: 'User'
        })
        .populate({
          path: 'location',
          model: 'Location'
        })
        .populate({
          path: 'mushroom',
          model: 'Mushroom'
        });
      return sighting;
    },

    getMyMushrooms: async (root, { user }, { Mushroom }) => {

      const myMushrooms = await Mushroom.find({ user }).sort({ commonname: 1 })
        .populate({
          path: 'user',
          model: 'User'
        })
        .populate({
          path: 'sightings',
          model: 'Sighting',
          populate: {
            path: 'location',
            model: 'Location'
          }
        });
      return myMushrooms;
    },

    getSelectionMushrooms: async (root, { user }, { Mushroom }) => {

      const myMushrooms = await Mushroom.find({ user }).sort({ commonname: 1 })
        .populate({
          path: 'user',
          model: 'User'
        })
        .populate({
          path: 'sightings',
          model: 'Sighting',
          populate: {
            path: 'location',
            model: 'Location'
          }
        });

      // const filtered = myMushrooms.filter(mushroom => {
      //   return mushroom.newMushroom === true;
      // });

      const combined =  myMushrooms.concat(templateMushrooms);

      const filtered = combined.filter(mushroom => {
        if (myMushrooms[mushroom.commonname]) {
          return false;
        }
        myMushrooms[mushroom.commonname] = true;
        return true;
      });
      console.log('filtered in resolvers:', filtered)

      return filtered;
    },

    getMushroom: async (root, { _id }, { Mushroom }) => {
      const mushroom = await Mushroom.findOne({ _id })
        .populate({
          path: 'user',
          model: 'User'
        })
        .populate({
          path: 'sightings',
          model: 'Sighting',
          populate: {
            path: 'location',
            model: 'Location'
          }
        });
      return mushroom;
    }
  },

  Mutation: {

    addLocation: async (root, { locationname, address, user }, { Location, User }, info) => {
      
      const newLocation = await new Location({
        locationname,
        address,
        user
      }).save()

      const userWithNewLocation = await User.findOneAndUpdate({ _id: ObjectId(user) }, { $addToSet: { locations: newLocation._id }}).populate('locations');

      return newLocation;
    },

    addSighting: async (root, { user, location, mushroom, date, latitude, longitude }, { User, Location, Sighting, Mushroom }) => {

      const newSighting = await new Sighting({
        user,
        location,
        mushroom,
        date,
        latitude,
        longitude
      }).save();

      const userWithNewSighting = await User.findOneAndUpdate({ _id: ObjectId(user) }, { $addToSet: { sightings: newSighting._id }}).populate('sightings');

      const locationWithNewSighting = await Location.findOneAndUpdate({ _id: ObjectId(location) }, { $addToSet: { sightings: newSighting._id }}).populate('sightings');

      const mushroomWithNewSighting = await Mushroom.findOneAndUpdate({ _id: ObjectId(mushroom) }, { $addToSet: { sightings: newSighting._id, locations: location }}).populate('sightings');

      return newSighting;
    },

    addMushroom: async (root, { user, location, commonname, latinname, imageUrl, imageCredit, newMushroom }, { User, Location, Mushroom }) => {

      const addedMushroom = await new Mushroom({
        user,
        commonname,
        latinname,
        imageUrl,
        imageCredit,
        newMushroom
      }).save();

      const userWithAddedMushroom = await User.findOneAndUpdate({ _id: ObjectId(user) }, { $addToSet: { mushrooms: addedMushroom._id }}).populate('mushrooms');

      const locationWithAddedMushroom = await Location.findOneAndUpdate({ _id: ObjectId(location) }, { $addToSet: { mushrooms: addedMushroom._id }}).populate('mushrooms');

      // const updatedNewMushroom = await Mushroom.findOneAndUpdate({ _id: ObjectId(newMushroom._id)}, { $addToSet: { locations: ObjectId(location) }}).populate('locations');

      return addedMushroom;
    },

    deleteLocation: async (root, { _id, user }, { User, Location }) => {
      const location = await Location.findOneAndRemove({ _id });

      const userWithDeletedLocation = await User.findOneAndUpdate({ user }, { $pull: { locations: location._id }}).populate('locations').populate('mushrooms');

      return location;
    },

    updateLocation: async (root, { _id, locationname, address }, { Location }) => {
      const updatedLocation = await Location.findOneAndUpdate(
        { _id },
        { $set: { locationname, address }},
        { new: true }
      );
      return updatedLocation;
    },

    deleteSighting: async (root, { _id, user, location, mushroom }, { Sighting, User, Location, Mushroom }) => {
      const sighting = await Sighting.findOneAndRemove({ _id });

      const userWithDeletedSighting = await User.findOneAndUpdate({ _id: ObjectId(user) }, { $pull: { sightings: _id }}).populate('sightings');

      const locationWithDeletedSighting = await Location.findOneAndUpdate({ _id: ObjectId(location) }, { $pull: { sightings: _id }}).populate('sightings');

      const mushroomWithDeletedSighting = await Mushroom.findOneAndUpdate({ _id: ObjectId(mushroom) }, { $pull: { sightings: _id }}).populate('sightings');
      
      return sighting;
    },

    updateSighting: async (root, { _id, date, latitude, longitude }, { Sighting }) => {
      const updatedSighting = await Sighting.findOneAndUpdate(
        { _id },
        { $set: { date, latitude, longitude }},
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
