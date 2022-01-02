const express = require("express");
const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/extract-file");
const PostsController = require("../controllers/posts")

const router = express.Router();


router.post('', checkAuth, extractFile,PostsController.postCreate);

router.get('', PostsController.postsGet);

router.get('/:id', PostsController.postGet);

router.put('/:id', checkAuth, extractFile, PostsController.postUpdate);

router.delete('/:id', checkAuth, PostsController.postDelete);

module.exports = router;
