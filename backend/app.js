const express = require('express');
const bodyParser = require('body-parser');
const postsRoute = require('./routes/posts');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb+srv://Atul:kC7x0laJNVAuoU6H@cluster0.gzorx.mongodb.net/ng-angular?retryWrites=true&w=majority')
.then(()=>{
  console.log("Connection Successful");
})
.catch((e)=>{
  console.log("Connection Failed"+e.message);
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, DELETE, PUT, PATCH, OPTIONS");
  next();
});

app.use('/api/posts',postsRoute);

module.exports = app;
