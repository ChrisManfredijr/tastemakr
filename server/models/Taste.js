const { Schema} = require('mongoose');


const tasteSchema = new Schema(
  {
    artist: {
      type:String,
    },
    bio: {
      type:String,
    },
    link: {
      type: String,
    },
    image: {
      type: String,
    },
    artistId: {
      type: String,
      required: true
    }
  },
);




module.exports = tasteSchema;
