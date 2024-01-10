const postModel = require("../models/post_model");

const renderAdminHome = (req, resp) => {
  if (!req.user) {
    resp.redirect("/admin/login");
  } else {
    
    resp.render("admin/home", { err: "" });
  }
};
module.exports = { renderAdminHome };
