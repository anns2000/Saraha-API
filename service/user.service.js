const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const storyModel = require("../models/story.model");
const { default: mongoose } = require("mongoose");
module.exports.checkContacts = async (req, res) => {
  const { contacts } = req.body;
  const validContacts = [];
  await Promise.all(
    contacts.map(async (phone) => {
      const user = await userModel.findOne({ phone });

      if (user) {
        const story = await storyModel.findOne({
          userId: user._id,
          isOpen: true,
        });
        console.log(story);
        if (story)
          await storyModel.findByIdAndUpdate(
            { _id: mongoose.Types.ObjectId(story._id) },
            { visiting: story.visiting + 1 }
          );
        validContacts.push({
          name: user.name,
          phone: phone,
          id: user._id,
          isPublish: user.isPublish,
          story: story,
        });
      }
    })
  );
  res.json({ validContacts });
};

module.exports.signup = async (req, res) => {
  const { name, phone, password, age } = req.body;
  const user = await userModel.findOne({ phone });
  if (user) {
    res.json({ message: "The Phone Number Already Exists." });
  } else {
    await userModel.insertMany({ name, phone, password, age });
    const user = await userModel.findOne({ phone });
    const token = jwt.sign({ id: user._id }, "saraha");
    res.json({ message: "success", token });
  }
};

module.exports.signin = async (req, res) => {
  const { phone, password } = req.body;
  const user = await userModel.findOne({ phone });
  if (user) {
    if (password === user.password) {
      const token = jwt.sign({ id: user._id }, "saraha");

      res.json({ message: "Login success", token, user });
    } else {
      res.json({ message: "Can't Login, Please Check Your Password." });
    }
  } else {
    res.json({
      message: "Can't Find Your Account, Please Check Your Phone Number.",
    });
  }
};
// 63c3f1a8376fbf95110167ee eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYzNmMWE4Mzc2ZmJmOTUxMTAxNjdlZSIsImlhdCI6MTY3Mzc5NDAyMH0._J3KYyeYcSxcOcOVIPuLGVMjxk_QY_ENvbvoVnogHhE
// 63c402c5caacd4b240c619e8 :  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYzQwMmM1Y2FhY2Q0YjI0MGM2MTllOCIsImlhdCI6MTY3Mzc5NDA2N30.qcdVrszfUJSgLczs4RHoLwpM31K4xdIqxhY-jo7SeHE
