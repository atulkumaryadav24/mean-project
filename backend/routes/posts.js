const express = require("express");
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();
const MIME_EXT_MAP = {
  'image/png':'png',
  'image/jpeg':'jpg',
  'image/jpg':'jpg'
};
const storage = multer.diskStorage({
  destination : (req,file,cb) =>{
    const isValid = MIME_EXT_MAP[file.mimetype];
    let error = new Error("Invaid Mime Type");
    if(isValid){
      error = null;
    }
    cb(error, "backend/images");
  },
  filename : (req,file,cb) =>{
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_EXT_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});
const Post = require('../models/post');
router.post('', checkAuth,multer({storage : storage}).single("image"),(req,res,next)=>{
  const url = req.protocol + "://" + req.get("host");
  const post = new Post({
    title : req.body.title,
    desc : req.body.desc,
    imagePath : url + "/images/" + req.file.filename,
    creator : req.userData.userId
  });
  post.save().then(createdPost => {
  res.status(201).json({
      message : 'Post added successfully',
      post : {
        ...createdPost,
        id : createdPost._id
      }
    });
  })
  .catch(error =>{
    res.status(500).json({
      message : "Creating a post failed!"
    });
  });
});

router.get('',(req,res,next)=>{
  const postQuery = Post.find();
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  let fetchedPosts;
  if(pageSize && currentPage){
    postQuery
    .skip(pageSize * (currentPage - 1))
    .limit(pageSize);
  }
  postQuery.then(documents => {
    fetchedPosts = documents;
    return Post.count();
  })
  .then(count => {
    res.status(200).json({
    message : "Post fetched successfully!",
    posts : fetchedPosts,
    maxPosts : count
    });
  })
  .catch(error =>{
    res.status(500).json({
      message : "Fetching posts failed!"
    });
  });
});

router.get('/:id',(req, res, next)=>{
  Post.findById(req.params.id)
  .then(post => {
    if(post){
      res.status(200).json(post);
    }
    else{
      res.status(404).json({ message : "Post Not Found !!" });
    }
  })
  .catch(error =>{
    res.status(500).json({
      message : "Fetching post failed!"
    });
  });
});

router.put('/:id', checkAuth, multer({storage : storage}).single("image"), (req, res, next)=>{
  let imagePath = req.body.imagePath;
  if(req.file){
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  const post = new Post({
    _id : req.body.id,
    title : req.body.title,
    desc : req.body.desc,
    imagePath : imagePath,
    creator : req.userData.userId
  });
  Post.updateOne({_id : req.params.id, creator: req.userData.userId} , post).then(result=>{
    console.log(result);
    if(result.modifiedCount > 0){
      res.status(200).json({  message : "Post Updated!" });
    }
    else{
      res.status(401).json({  message : "Not Authorized!" });
    }
  })
  .catch(error =>{
    res.status(500).json({
      message : "Update failed!"
    });
  });
});

router.delete('/:id', checkAuth,(req,res,next)=>{
  Post.deleteOne({_id : req.params.id, creator: req.userData.userId}).then(result=>{
    console.log(result);
    if(result.deletedCount > 0){
      res.status(200).json({  message : "Post Deleted!" });
    }
    else{
      res.status(401).json({  message : "Not Authorized!" });
    }
  })
  .catch(error =>{
    res.status(500).json({
      message : "Delete failed!"
    });
  });
});

module.exports = router;
