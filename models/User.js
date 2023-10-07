const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      Unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      Unique: true,
      required: true,
      validate: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
    },
    thoughts: [{ type: ObjectId, ref: 'thought' }],
    friends: [{ type: ObjectId, ref: 'user' }],
    // TODO: do ojbectIDs need schema.types prefix?
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `fullName` that gets and sets the user's full name
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  });

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
