const express = require("express");
const postController = require("../controllers/post");
const router = express.Router();
const uploads = require("../utility/multer_imageupload");
const verifyUser = require("../middlewere/jwt_verify");
// #### post read more
router.get("/api/post/:id", postController.readMore);

//
router.get("/api/post", postController.getPost);
router.post("/api/post", uploads.single("image"), verifyUser,postController.createPost);
router.put("/api/post/update/:id", verifyUser,postController.editPost);
router.delete("/api/post/delete/:id", verifyUser,postController.deletePost);

module.exports = router;
