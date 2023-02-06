process.env.TZ = 'Africa/Cairo';
const express = require("express");
const mongoose = require("mongoose");
const { checkTimeStory } = require("./service/checkout_story.service");

const app = express();
const port = 3000;

mongoose.set("strictQuery", false);

app.use(express.json());
app.use("/user", require("./apis/user.api"));
app.use("/story", require("./apis/story.api"));
app.use("/message", require("./apis/message.api"));
app.get("/",async (req, res) => {
  res.send("Welcome To My API - Saraha -");
});

app.listen(port, () => console.log(`Example app listening on port  ${port}!`));
const link = "mongodb+srv://saraha:3122020@cluster0.oba4pbh.mongodb.net/saraha";
mongoose.connect(link, () => {
  console.log("mongdb is online connected");
  checkTimeStory();
});

// console.log(new Date('Sun Jan 15 2023 22:58:38 GMT+0200 (Eastern European Standard Time)'));

