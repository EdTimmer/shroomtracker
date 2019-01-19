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
        });
        // .exec();
      return user;
    },

    // getAllLocations: async (root, { username }, { Location }) => {
    //   const allLocations = await Location.find({ username }).sort({ locationname: 1 });
    //   return allLocations;
    // },

    getLocation: async (root, { _id }, { Location }) => {
      const location = await Location.findOne({ _id })
        .populate({
          path: 'sightings',
          model: 'Sighting'
        });
      return location;
    },

    getSighting: async (root, { _id }, { Sighting }) => {
      const sighting = await Sighting.findOne({ _id })
        .populate({
          path: 'location',
          model: 'Location'
        });
      return sighting;
    },

    getMyLocations: async (root, { user }, { Location }) => {
      const myLocations = await Location.find({ user }).sort({createdDate: 'desc'});
      return myLocations;
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

    // likeRecipe: async (root, { _id, username }, { Recipe, User }) => {
    //   const recipe = await Recipe.findOneAndUpdate({ _id }, { $inc: { likes: 1 } });
    //   const user = await User.findOneAndUpdate({ username }, { $addToSet: { favorites: _id }});
    //   return recipe;
    // },

    addLocation: async (root, { locationname, address, user }, { Location, User }, info) => {
      
      const newLocation = await new Location({
        locationname,
        address,
        user
      }).save()
      // .then((res) => console.log('saved location is:', res))
        // .then((res) => User.findOneAndUpdate({ username }, { $addToSet: { locations: res._id }}))
        // .then((res) => console.log('update user is:', res))
        // .then(res => console.log('res is:', res))
      // console.log('user is:', user)
      // console.log('newLocation._id is:', newLocation._id)
      const userWithNewLocation = await User.findOneAndUpdate({ _id: ObjectId(user) }, { $addToSet: { locations: newLocation._id }}).populate('locatoins');
      // const userWithNewLocation = 'test'
      // console.log('userWithNewLocation is:', userWithNewLocation)
      
      return newLocation;
    },

    // addLocation: async (root, { locationname, address, user }, { Location, User }, info) => {
    //   const newLocation = await new Location({
    //     locationname,
    //     address,
    //     user
    //   });

    //   const promise = new Promise((resolve, reject) => {
    //     newLocation.save((err, res) => {
    //       err ? reject(err) : resolve(res);
    //     });
    //   });

    //   const userWithNewLocation = await User.findOneAndUpdate({ user }, { $addToSet: { locations: newLocation._id }}).populate('locations');

    //   return promise;
    // },


    addSighting: async (root, { user, location, commonname, latinname, imageUrl, imageCredit, date, latitude, longitude }, { Sighting, User, Location }) => {
      const newSighting = await new Sighting({
        user,
        location,
        commonname,
        latinname,
        imageUrl,
        imageCredit,
        date,
        latitude,
        longitude
      }).save();

      const userWithNewSighting = await User.findOneAndUpdate({ user }, { $addToSet: { sightings: newSighting._id }}).populate('sightings');

      const locationWithNewSighting = await Location.findOneAndUpdate({ location }, { $addToSet: { sightings: newSighting._id }}).populate('sightings');

      return newSighting;
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

      const userWithDeletedLocation = await User.findOneAndUpdate({ user }, { $pull: { locations: location._id }}).populate('locations');

      return sighting;
    },

    deleteSighting: async (root, { _id, user, location }, { Sighting, User, Location }) => {
      const sighting = await Sighting.findOneAndRemove({ _id });

      const userWithDeletedSighting = await User.findOneAndUpdate({ user }, { $pull: { sightings: newSighting._id }}).populate('sightings');

      const locationWithDeletedSighting = await Location.findOneAndUpdate({ location }, { $pull: { sightings: newSighting._id }}).populate('sightings');
      
      return sighting;
    },

    updateSighting: async (root, { _id, location, commonname, latinname, imageUrl, imageCredit, date, latitude, longitude }, { Sighting }) => {
      const updatedSighting = await Sighting.findOneAndUpdate(
        { _id },
        { $set: { location, commonname, latinname, imageUrl, imageCredit, date, latitude, longitude }},
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
