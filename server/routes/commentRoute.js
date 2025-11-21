const { Router } = require("express");
const router = Router();

const commentController = require('../controllers/commentController');
const authRequired = require("../auth/auth");

// Already from : "/api/posts/..."

router.get('/post/:postId', commentController.listCommentsByPost);

router.post("/post/:postId", authRequired, commentController.createComment);

router.put("/:id",authRequired, commentController.updateComment);

router.delete("/:id", authRequired, commentController.deleteComment);


module.exports = router;
