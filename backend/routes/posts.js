const express = require("express");
const router = express.Router();

const Post = require('../models/post');
router.post('',(req,res,next)=>{
  const post = new Post({
    title : req.body.title,
    desc : req.body.desc
  });
  post.save().then(createdPost => {
  res.status(201).json({
      message : 'Post added successfully',
      postId : createdPost._id
    });
  });
});

router.get('',(req,res,next)=>{
  Post.find().then(documents => {
    res.status(200).json({
    message : "Post fetched successfully!",
    posts : documents
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
  });
});

router.put('/:id',(req, res, next)=>{
  const post = new Post({
    _id : req.body.id,
    title : req.body.title,
    desc : req.body.desc
  });
  Post.updateOne({_id : req.params.id} , post).then(result=>{
    console.log(result);
    res.status(200).json({  message : "Post Updated" });
  });
});

router.delete('/:id',(req,res,next)=>{
  Post.deleteOne({_id : req.params.id}).then(result=>{
    console.log(result);
    res.status(200).json({  message : "Post Deleted" });
  })
});

module.exports = router;
