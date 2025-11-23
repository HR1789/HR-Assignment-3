// Load the MongoDB connection string from the .env file and export it for use in the app.

require('dotenv').config();

module.exports = {
    URI: process.env.MONGODB_URI 
};