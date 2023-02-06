const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    message: String,
    storyId: mongoose.SchemaTypes.ObjectId,
  },
  { timestamps: true }
);
module.exports = mongoose.model("message", schema);
