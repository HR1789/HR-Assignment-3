// server/models/User.js

let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema(
  {
    providerId: String,      // ID from Google or GitHub
    provider: String,        // 'google' or 'github'
    displayName: String,
    email: String,
    photo: String,
    createdAt: { type: Date, default: Date.now }
  },
  {
    collection: 'Users'
  }
);

module.exports = mongoose.model('User', UserSchema);
