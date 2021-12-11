const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, DELETE, PATCH, OPTIONS");
  next();
});
app.post('/api/posts',(req,res,next)=>{
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message : 'Post added successfully'
  });
})
app.get('/api/posts',(req,res,next)=>{
  const posts = [{
    id: 'erg567fdg6',
    title:'First post returned from server',
    desc:"This post was returned from the server ;)"
  },{
    id: 'g76fh67dgh',
    title:'Second post returned from server',
    desc:"This post was returned from the server ;("
  }];
  res.status(200).json({
    message : "Post fetched successfully!",
    posts : posts
  });
});

module.exports = app;
