const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const upload = require("../config/multer");

// CREATE WITH IMAGE
router.post("/", upload.single("image"), async (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    content: req.body.content,
    image: req.file.path,        // image URL
    public_id: req.file.filename // public id
  });

  await newPost.save();
  res.json(newPost);
});

const cloudinary = require("../config/cloudinary");

router.delete("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);

  await cloudinary.uploader.destroy(post.public_id);

  await Post.findByIdAndDelete(req.params.id);

  res.json({ message: "Deleted" });
});

module.exports = router;

