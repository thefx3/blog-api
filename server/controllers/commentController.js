const CommentModel = require("../models/commentModel");

function parseId(value, label) {
  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    const message = label ? `Invalid ${label}.` : "Invalid identifier.";
    const error = new Error(message);
    error.statusCode = 400;
    throw error;
  }
  return parsed;
}

// api/comments/post/:postId

async function listCommentsByPost(req, res) {
  try {
    const postId = parseId(req.params.postId, "post id");
    const comments = await CommentModel.getAllComments({ postId });
    return res.json(comments);
  } catch (error) {
    const status = error.statusCode || 500;
    if (!error.statusCode) {
      console.error("Error fetching comments:", error);
    }
    return res.status(status).json({ message: error.message || "Internal server error." });
  }
}

// api/comments/post/:postId

async function createComment(req, res) {
  const { content } = req.body;

  if (!content === undefined) {
    return res.status(400).json({ message: "Content is required." });
  }

  const authorId = req.user?.userId;

  if (!authorId) {
    return res.status(401).json({ message: "Authentication required." });
  }

  try {
    const parsedAuthorId = parseId(authorId, "authorId");
    const postId = parseId(req.params.postId, "post id");

    const newComment = await CommentModel.createComment({
      content,
      authorId: parsedAuthorId,
      postId,
    });

    return res.status(201).json(newComment);
  } catch (error) {
    const status = error.statusCode || 500;
    if (!error.statusCode) {
      console.error("Error creating comment:", error);
    }
    return res.status(status).json({ message: error.message || "Internal server error." });
  }
}

// api/comments/:id

async function updateComment(req, res) {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: "content is required." });
  }

  try {
    const id = parseId(req.params.id, "comment id");
    const existingComment = await CommentModel.getCommentById(id);

    if (!existingComment) {
      return res.status(404).json({ message: "Comment not found." });
    }

    const updatedComment = await CommentModel.updateComment(id, {
      content,
      lastEdit: new Date(),
    });

    return res.json(updatedComment);
  } catch (error) {
    const status = error.statusCode || 500;
    if (!error.statusCode) {
      console.error("Error updating comment:", error);
    }
    return res.status(status).json({ message: error.message || "Internal server error." });
  }
}

async function deleteComment(req, res) {
  try {
    const id = parseId(req.params.id, "comment id");
    const existingComment = await CommentModel.getCommentById(id);

    if (!existingComment) {
      return res.status(404).json({ message: "Comment not found." });
    }

    await CommentModel.deleteComment(id);
    return res.status(204).send();
  } catch (error) {
    const status = error.statusCode || 500;
    if (!error.statusCode) {
      console.error("Error deleting comment:", error);
    }
    return res.status(status).json({ message: error.message || "Internal server error." });
  }
}

module.exports = {
  listCommentsByPost,
  createComment,
  updateComment,
  deleteComment,
};
