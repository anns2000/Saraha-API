const storyModel = require("../models/story.model");
const nodeSchedule = require("node-schedule");
const userModel = require("../models/user.model");
const { default: mongoose } = require("mongoose");
module.exports.checkTimeStory = async () => {
  console.log("run checkTimeStory");
  const storys = await storyModel.find({ isOpen: true });
  await Promise.all(
    storys.map(async (it) => {
      const d1 = it.createdAt.getTime();
      const d2 = new Date().getTime();
      const diff = d2 - d1;
      console.log("diff : " + diff);
      if (diff >= 1000 * 15) {

        console.log("is over: " + it.question);

        await storyModel.findByIdAndUpdate({ _id: it._id }, { isOpen: false });

        await userModel.findByIdAndUpdate(
          { _id: mongoose.Types.ObjectId(it.userId) },
          { $set: { isPublish: false } }
        );

      } else {

        const publishTime = new Date(it.publishTime);
        const dd = new Date((publishTime.getTime()) + (60*60*26*1000) );
        console.log("send is threade: " + it.question + " " + dd.toISOString());
        nodeSchedule.scheduleJob(dd, async function () {
          console.log(it.userId + " -*- " + it.question);
          await userModel.findByIdAndUpdate(
            { _id: mongoose.Types.ObjectId(it.userId) },
            { $set: { isPublish: false } }

          );

          await storyModel.updateMany(
            { userId: it.userId, isOpen: true },
            { isOpen: false }
          );
        });
      }
    })
  );
};
