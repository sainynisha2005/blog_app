const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require("cors");


const app = express();
const PORT = 5000;
app.use(cors());
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blogapp')
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Schema
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String
});

const Post = mongoose.model('Post', postSchema);

// Create uploads folder in backend directory
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
  console.log('Created uploads folder at:', uploadsDir);
}

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: function(req, file, cb) {
    cb(null, 'image-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
});

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Only images are allowed!');
  }
}

// Middleware
app.use(express.json());

// Serve uploads folder
app.use('/uploads', express.static(uploadsDir));

// CREATE POST with image
app.post('/posts', upload.single('image'), async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      image: req.file ? `http://localhost:${PORT}/uploads/${req.file.filename}` : null
    });
    
    await post.save();
    console.log('✅ Post created:', post.title);
    console.log('📷 Image URL:', post.image);
    res.json(post);
  } catch (err) {
    console.error('❌ Error creating post:', err);
    res.status(500).json({ error: err.message });
  }
});

// GET ALL POSTS
app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ _id: -1 });
    console.log('✅ Fetched', posts.length, 'posts');
    res.json(posts);
  } catch (err) {
    console.error('❌ Error fetching posts:', err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE POST
app.delete('/posts/:id', async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    console.log('✅ Post deleted:', req.params.id);
    res.json({ message: 'Post deleted' });
  } catch (err) {
    console.error('❌ Error deleting post:', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📁 Uploads folder: ${uploadsDir}`);
});