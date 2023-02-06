const mongoose = require("mongoose");


const schema = mongoose.Schema(
  {
    publishTime: { type: String, default: new Date() },
    isOpen: { type: Boolean, default: true },
    question: { type: String, default: "" },
    visiting: { type: Number, default: 0 },
    replies: { type: Number, default: 0 },
    userId: mongoose.SchemaTypes.ObjectId,
    idInc: { type: Number, default: 0 },
  },
  { timestamps: true }
);
module.exports = mongoose.model("story", schema);
