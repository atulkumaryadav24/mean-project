const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = Schema({
  title : {
    type : String,
    required : true
  },
  desc : {
    type : String,
    required : true
  },
  imagePath : {
    type : String,
    required : true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

module.exports = mongoose.model('Post',postSchema);
