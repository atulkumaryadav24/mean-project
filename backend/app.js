const express = require('express');

const app = express();

app.use((req,res,next)=>{
  console.log("First middleware");
  next();
});
app.use((req,res,next)=>{
  res.send('This is 2nd middleware giving response');
});

module.exports = app;
