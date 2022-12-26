const { Schema} = require('mongoose');


const tasteSchema = new Schema(
  {
    artistId: {
      type: String,
      unique: true,
    },
    artist: {
      type:String,
    },
    bio: {
      type:String,
    },
    image: {
      type: String,
    },
    link: {
      type: String,
    },
    logo: {
      type: String,
    },
  },
);




module.exports = tasteSchema;
