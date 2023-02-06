const mongoose = require("mongoose");

const schema = mongoose.Schema({
  age: Number,
  name: String,
  phone: String,
  password: String,
  isPublish: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("user", schema);
