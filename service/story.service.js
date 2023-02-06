const storyModel = require("../models/story.model");
const nodeSchedule = require("node-schedule");
const { checkTimeStory } = require("./checkout_story.service");
const userModel = require("../models/user.model");
const { default: mongoose } = require("mongoose");

module.exports.publishStory = async (req, res) => {
  
  const { question } = req.body;
  const userId = req.id;
  if (question.trim().length) {
    const idInc = (await storyModel.countDocuments()) + 1;
    await storyModel.insertMany({ question, userId, idInc });
    console.log(userId + "  " + new Date());
    await userModel.findByIdAndUpdate(
      { _id: mongoose.Types.ObjectId(userId) },
      { $set: { isPublish: true } }
    );
    const TIME_STORY = 60 * 60 * 24 * 1000;
    const dd = new Date(new Date().getTime() + TIME_STORY);

    nodeSchedule.scheduleJob(dd, async function () {
      console.log(userId + " -+- " + question);

      await userModel.findByIdAndUpdate(
        { _id: mongoose.Types.ObjectId(userId) },
        { $set: { isPublish: false } }
      );

      await storyModel.updateMany(
        { userId: userId, isOpen: true },
        { isOpen: false }
      );

      await checkTimeStory();
    });

    res.status(201);
    res.json({ message: "Success" });
  } else {
    res.status(204);
    res.json({ message: "You can't send empty question." });
  }
};

module.exports.getStorys = async (req, res) => {
  const userId = req.id;
  const storys = await storyModel.find({ userId });
  res.json({ message: "Success", storys });
};
