let mongoose = require("mongoose");

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
        collection: "AssignmentData",
    }

    );
module.exports = mongoose.model('Assignment', AssignmentSchema);