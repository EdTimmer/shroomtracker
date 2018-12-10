exports.resolvers = {

  Query: {

    getAllLocations: async (root, args, { Location }) => {
      const allLocations = await Location.find().sort({ locationname: 1 });
      return allLocations;
    },

    getLocation: async (root, { _id }, { Location }) => {
      const location = await Location.findOne({ _id });
      return location;
    },

    getAllMushrooms: async (root, args, { Mushroom }) => {
      const allMushrooms = await Mushroom.find().sort({ commonname: 1 });
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

    addLocation: async (root, { locationname, address }, { Location }) => {
      const newLocation = await new Location({
        locationname,
        address
      }).save();
      return newLocation;
    },

    addMushroom: async (root, { commonname, latinname, locationname, imageUrl, date, coordinates }, { Mushroom }) => {
      const newMushroom = await new Mushroom({
        commonname, 
        latinname, 
        locationname, 
        imageUrl, 
        date, 
        coordinates
      }).save();
      return newMushroom;
    }
  }
}