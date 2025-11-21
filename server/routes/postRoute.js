const { Router } = require("express");
const router = Router();

const postController = require('../controllers/postController');
const authRequired = require("../auth/auth");

router.get('/', postController.listPosts); 
router.get("/:id", postController.getSinglePost)

router.post("/", authRequired, postController.createPost)

router.put("/:id", authRequired, postController.updatePost)

router.delete("/:id", authRequired, postController.deletePost)


module.exports = router;
