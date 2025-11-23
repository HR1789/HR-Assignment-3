// Import Mongoose for schema and database modeling
let mongoose = require("mongoose");

// Define the structure for an Assignment document
let AssignmentSchema = new mongoose.Schema(
    {
        title: String,
        course: String,
        dueDate: Date,
        status: String,
        priority: String,
        description: String,
        timestamp: { type: Date, default: Date.now }
    },
    {
        collection: "Assignments", // Specify the collection name
    }

    );

// Export the model for use in the app
module.exports = mongoose.model('Assignment', AssignmentSchema);