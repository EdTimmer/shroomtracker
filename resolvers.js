const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

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
          model: 'Sighting'
        })
        .populate({
          path: 'mushrooms',
          model: 'Mushroom'
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
      console.log('getMyMushrooms got called in the resolvers')
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

    getMushroom: async (root, { _id }, { Mushroom }) => {
      const mushroom = await Mushroom.findOne({ _id })
        .populate({
          path: 'user',
          model: 'User'
        })
        .populate({
          path: 'location',
          model: 'Location'
        })
        .populate({
          path: 'sighting',
          model: 'Sighting'
        });
      return mushroom;
    },


    // getAllSightings: async (root, { username }, { Sighting }) => {
    //   const allSightings = await Sighting.find({ username }).sort({createdDate: 'desc'});
    //   return allSightings;
    // },

    // getLocationSightings: async (root, { locationname, username }, { Sighting }) => {
    //   const locationSightings = await Sighting.find({ locationname, username }).sort({ createdDate: 'desc' });
    //   return locationSightings;
    // },

    // getLocationMushroomSightings: async (root, { commonname, locationname, username }, { Sighting }) => {
    //   const locationMushroomSightings = await Sighting.find({ commonname, locationname, username }).sort({ createdDate: 'desc'});
    //   return locationMushroomSightings;
    // },

    // getAllMushrooms: async (root, { username }, { Mushroom }) => {
    //   const allMushrooms = await Mushroom.find({ username }).sort({ commonname: 1 });
    //   return allMushrooms;
    // },

    // searchSightings: async (root, { searchTerm, username }, { Sighting }) => {
    //   if (searchTerm) {
    //     const searchResults = await Sighting.find({
    //       $text: { $search: searchTerm }, username
    //     }, {
    //       score: { $meta: "textScore" }
    //     }).sort({
    //       score: { $meta: "textScore" }
    //     });
    //     return searchResults;
    //   }
    //   else {
    //     const sightings = await Sighting.find({ username });
    //     return sightings;
    //   }
    // },
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
      console.log('addSighting was called in the resolvers')
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

    addMushroom: async (root, { user, location, commonname, latinname, imageUrl, imageCredit }, { User, Location, Mushroom }) => {
      console.log('addMushroom got called in the resolvers')
      console.log('user in addMushroom resolver is:', user)
      console.log('location in addMushroom resolver is:', location)
      const newMushroom = await new Mushroom({
        user,
        commonname,
        latinname,
        imageUrl,
        imageCredit
      }).save();

      const userWithNewMushroom = await User.findOneAndUpdate({ _id: ObjectId(user) }, { $addToSet: { mushrooms: newMushroom._id }}).populate('mushrooms');

      const locationWithNewMushroom = await Location.findOneAndUpdate({ _id: ObjectId(location) }, { $addToSet: { mushrooms: newMushroom._id }}).populate('mushrooms');

      // const updatedNewMushroom = await Mushroom.findOneAndUpdate({ _id: ObjectId(newMushroom._id)}, { $addToSet: { locations: ObjectId(location) }}).populate('locations');

      return newMushroom;
    },


    // addMushroom: async (root, { username, commonname, latinname, imageUrl }, { Mushroom }) => {
    //   const newMushroom = await new Mushroom({
    //     username,
    //     commonname,
    //     latinname,
    //     imageUrl
    //   }).save();
    //   return newMushroom;
    // },

    deleteLocation: async (root, { _id, user }, { User, Location }) => {
      const location = await Location.findOneAndRemove({ _id });

      const userWithDeletedLocation = await User.findOneAndUpdate({ user }, { $pull: { locations: location._id }}).populate('locations').populate('mushrooms');

      return sighting;
    },

    deleteSighting: async (root, { _id, user, location, mushroom }, { Sighting, User, Location, Mushroom }) => {
      const sighting = await Sighting.findOneAndRemove({ _id });

      const userWithDeletedSighting = await User.findOneAndUpdate({ user }, { $pull: { sightings: newSighting._id }}).populate('sightings');

      const locationWithDeletedSighting = await Location.findOneAndUpdate({ location }, { $pull: { sightings: newSighting._id }}).populate('sightings');

      const mushroomWithDeletedSighting = await Mushroom.findOneAndUpdate({ mushroom }, { $pull: { sightings: newSighting._id }}).populate('sightings');
      
      return sighting;
    },

    updateSighting: async (root, { _id, location, date, latitude, longitude }, { Sighting }) => {
      const updatedSighting = await Sighting.findOneAndUpdate(
        { _id },
        { $set: { location, date, latitude, longitude }},
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
