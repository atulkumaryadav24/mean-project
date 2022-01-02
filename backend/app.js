const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const postsRoute = require('./routes/posts');
const usersRoute = require('./routes/user');
const mongoose = require('mongoose');

const app = express();
mongoose.connect("mongodb+srv://Atul:" + process.env.MONGO_ATLAS_PW + "@cluster0.gzorx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
.then(()=>{
  console.log("Connection Successful");
})
.catch((e)=>{
  console.log("Connection Failed: "+e.message);
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use("/images",express.static(path.join("backend/images")));
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, DELETE, PUT, PATCH, OPTIONS");
  next();
});

app.use('/api/posts',postsRoute);
app.use('/api/users',usersRoute);

module.exports = app;
