const jwt = require("jsonwebtoken");
module.exports.athu = (req, res, next) => {
    const token = req.header('token')
  jwt.verify(token, "saraha", (err, decode) => {
    if (err) {
      res.json({ message: "You are not authorized !!"});
    } else {
      req.id = decode.id;
      next();
    }
  });
};
