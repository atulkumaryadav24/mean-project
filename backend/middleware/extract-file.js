const multer = require("multer");

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
    cb(error, "images");
  },
  filename : (req,file,cb) =>{
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_EXT_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

module.exports = multer({storage : storage}).single("image");
