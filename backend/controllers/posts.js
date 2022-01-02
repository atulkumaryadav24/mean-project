const Post = require('../models/post');

exports.postCreate = (req,res,next)=>{
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
};

exports.postsGet = (req,res,next)=>{
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
};

exports.postGet = (req, res, next)=>{
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
};

exports.postUpdate = (req, res, next)=>{
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
    if(result.matchedCount > 0){
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
};

exports.postDelete = (req,res,next)=>{
  Post.deleteOne({_id : req.params.id, creator: req.userData.userId}).then(result=>{
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
};
