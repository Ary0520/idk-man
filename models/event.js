const mongoose= require("mongoose");

const eventSchema = mongoose.Schema({
    image: {
        data: Buffer,
        contentType: String
    },
    title: String,
    organisationName: String,
    description: String,
    link: String
});

module.exports = mongoose.model("event", eventSchema);