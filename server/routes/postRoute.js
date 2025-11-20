const { Router } = require("express");
const router = Router();

const postController = require('../controllers/postController');

router.get('/', postController.listPosts); 
router.get("/:id", postController.getSinglePost)

router.post("/", postController.createPost)

router.put("/:id", postController.updatePost)

router.delete("/:id", postController.deletePost)


module.exports = router;
