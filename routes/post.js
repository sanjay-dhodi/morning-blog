const express = require("express");
const postController = require("../controllers/post");
const router = express.Router();
const uploads = require("../utility/multer_imageupload");
const verifyUser = require("../middlewere/jwt_verify");
// #### post read more
router.get("/api/post/:id", postController.readMore);
router.get("/api/post", postController.getPost);
router.post(
  "/api/post",
  verifyUser,
  uploads.single("image"),
  postController.createPost
);

router.get(
  "/api/post/update/:id",
  verifyUser,
  postController.renderEditPostPage
);
router.put(
  "/api/post/update/:id",
  verifyUser,
  uploads.single("image"),
  postController.editPost
);
router.delete("/api/post/delete/:id", verifyUser, postController.deletePost);

module.exports = router;
