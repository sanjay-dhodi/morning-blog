require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyUser = (req, resp, next) => {
  const token = req.cookies["access_token"];
  // const token = "ssssssssssssss";

  if (!token) {
    next(new Error("no token found"));
    resp.redirect("/admin/login");
  }

  if (token) {
    jwt.verify(token, process.env.JWT_TOKEN, (err, authData) => {
      if (err) {
        next(new Error("invalid token"));
      }
      if (authData) {
        req.user = authData;
        next();
      }
    });
  }
};

module.exports = verifyUser;
