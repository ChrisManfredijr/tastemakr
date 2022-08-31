const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const tasteSchema = require('./Taste');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
     
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!']
    },
    password: {
      type: String,
      required: true,
      minlength: 8
    },

    tastes: [tasteSchema],
  },
  {
    toJSON: {
      virtuals: true
    },
  }
);

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

userSchema.virtual('tasteCount').get(function() {
  return this.tastes.length;
});

const User = model('User', userSchema);

module.exports = User;
