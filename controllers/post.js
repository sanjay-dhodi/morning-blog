const postModel = require("../models/post_model");

// get post
const getPost = async (req, resp) => {
  try {
    const fetchPosts = await postModel.find();

    if (fetchPosts.length > 0) {
      resp.json(fetchPosts);
    } else {
      resp.json("no posts available");
    }
  } catch (error) {
    resp.json(error.toString());
  }
};

// get single post with read more

const readMore = (req, resp) => {
  const postId = req.params.id;

  try {
    postModel
      .findOne({ _id: postId })
      .then((result) => {
        if (!result) {
          resp.json({ "no found post data": result });
        } else {
          resp.render("post", { postData: result, err: "" });
        }
      })
      .catch((err) => {
        resp.json({ "failed to retrive": err.toString() });
      });
  } catch (error) {
    resp.json(error.toString());
  }
};

// create post
const createPost = async (req, resp) => {
  const mimetype = req.file.mimetype.split("/");
  const fileType = mimetype[1];

  const data = {
    title: req.body.title,
    desc: req.body.desc,
    image: req.file.filename,
    filetype: fileType,
  };

  try {
    const postData = new postModel(data);

    await postData
      .save()
      .then((result) => {
        if (result) {
          resp.redirect("/admin");
        }
      })
      .catch((err) =>
        resp.json({
          "err msg": "data stored failed",
          "err type": err.toString(),
        })
      );
  } catch (error) {
    resp.json("somthing wrong with create post " + error.toString());
  }
};

// edit post
const editPost = async (req, resp) => {
  const id = req.params.id;

  try {
    await postModel
      .findByIdAndUpdate(id, { $set: { title: "sam altman" } }, { new: true })
      .then((result) => {
        if (!result) {
          resp.json({ "no found updated data": result });
        } else {
          resp.json({ "updated data": result });
        }
      })
      .catch((err) => {
        resp.json({ "failed to update": err.toString() });
      });
  } catch (error) {
    resp.json(error.toString());
  }
};

// delete post
const deletePost = async (req, resp) => {
  const id = req.params.id;

  try {
    await postModel
      .findByIdAndDelete(id)
      .then((result) => {
        if (!result) {
          resp.json("no data found for delete");
        } else {
          resp.json({ "deleted data ": result });
        }
      })
      .catch((err) => resp.json({ "failed to delet": err.toString() }));
  } catch (error) {
    resp.json(error.toString());
  }
};

module.exports = { getPost, readMore, createPost, editPost, deletePost };
