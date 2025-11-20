const { Router } = require("express");
const router = Router();

const commentController = require('../controllers/commentController');

// Already from : "/api/posts/..."

router.get('/post/:postId', commentController.listCommentsByPost);

router.post("/post/:postId", commentController.createComment);

router.put("/:id", commentController.updateComment);

router.delete("/:id", commentController.deleteComment);


module.exports = router;
