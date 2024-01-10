require("dotenv").config();
const userModel = require("../models/user_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// login
const getLoginPage = (req, resp) => {
  resp.render("admin/login", { err: "" });
};

const postLogin = (req, resp) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password != undefined) {
    userModel
      .findOne({ username: username })
      .then((user) => {
        if (user == null || undefined) {
          console.log("user not found with this username");
        } else {
          bcrypt.compare(password, user.password).then((result) => {
            if (!result) {
              console.log("wrong password");
              resp.redirect("/admin/login");
            } else {
              const { password, ...userWithoutPassword } = user._doc;
              const token = jwt.sign(
                userWithoutPassword,
                process.env.JWT_TOKEN,
                {
                  expiresIn: "1h",
                }
              );

              resp.cookie("access_token", token, {
                httpOnly: true,
                secure: true,
              });

              resp.redirect("/admin");
            }
          });
        }
      })
      .catch((err) => {
        console.log(err.toString());
      });
  }
};

// register
const getRegisterPage = (req, resp) => {
  resp.render("admin/register", { err: "" });
};
const postRegister = (req, resp) => {
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, 12, function (err, hash) {
    if (err) {
      console.log(err + "password hash problem");
    } else {
      const user = new userModel({
        username: username,
        password: hash,
      });

      user
        .save()
        .then(console.log("user successfully created"))
        .catch((err) => {
          console.log(err.toString());
        });
    }
  });

  resp.redirect("admin/login");
};

module.exports = { getLoginPage, getRegisterPage, postLogin, postRegister };
