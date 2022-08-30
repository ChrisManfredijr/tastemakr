const { Schema, model } = require('mongoose');


const tasteSchema = new Schema(
  {
    artist: {
      type:String,
      required: true,
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


const Taste = model('Taste', tasteSchema);

module.exports = Taste;
