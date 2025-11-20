const PostModel = require("../models/postModel");

function parseBoolean(value) {
  if (value === undefined) return undefined;
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const normalized = value.toLowerCase();
    if (normalized === "true") return true;
    if (normalized === "false") return false;
  }
  return null;
}

async function listPosts(req, res) {
  try {

    //Filter to have the route flexible... 

    const filters = {};

    //Filter by author
    if (req.query.authorId !== undefined) {
      const authorId = Number(req.query.authorId);
      if (Number.isNaN(authorId)) {
        return res.status(400).json({ message: "Invalid authorId filter." });
      }
      filters.authorId = authorId;
    }

    //Filter by if published or not
    if (req.query.published !== undefined) {
      const published = parseBoolean(req.query.published);
      if (published === null) {
        return res.status(400).json({ message: "Invalid published filter. Use true or false." });
      }
      filters.published = published;
    }

    //Get all posts if no filter
    const posts = await PostModel.getAllPosts(filters);
    return res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
}

async function getSinglePost(req, res) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "Invalid post id." });
  }

  try {
    const post = await PostModel.getPostById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }
    return res.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
}

async function createPost(req, res) {
  const { title, content, published } = req.body;

  if (!title || !content || !authorId) {
    return res.status(400).json({ message: "Title, content and authorId are required." });
  }

  const authorId = req.user.userId;

  const publishedValue = parseBoolean(published ?? undefined);
  if (publishedValue === null) {
    return res.status(400).json({ message: "Invalid published value. Use true or false." });
  }

  try {
    const newPost = await PostModel.createPost({
      title,
      content,
      authorId,
      published: publishedValue ?? false,
    });

    return res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
}

async function updatePost(req, res) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "Invalid post id." });
  }

  const { title, content, published } = req.body;
  const authorId = req.user.userId;

  if ( title === undefined && content === undefined && published === undefined && authorId === undefined ) {
    return res.status(400).json({ message: "No fields provided for update." });
  }

  try {
    const existingPost = await PostModel.getPostById(id);
    if (!existingPost) {
      return res.status(404).json({ message: "Post not found." });
    }

    const payload = {};

    let needsEditTimestamp = false;

    if (title !== undefined) {
      payload.title = title;
      needsEditTimestamp = true;
    }

    if (content !== undefined) {
      payload.content = content;
      needsEditTimestamp = true;
    }

    if (needsEditTimestamp) {
      payload.lastEdit = new Date();
    }

    if (authorId !== undefined) {
      const parsedAuthorId = Number(authorId);
      if (Number.isNaN(parsedAuthorId)) {
        return res.status(400).json({ message: "Invalid authorId." });
      }
      payload.author = { connect: { id: parsedAuthorId } };
    }

    if (published !== undefined) {
      const publishedValue = parseBoolean(published);
      if (publishedValue === null) {
        return res.status(400).json({ message: "Invalid published value. Use true or false." });
      }
      payload.published = publishedValue;
      payload.publishedAt = publishedValue ? new Date() : null;
    }

    const updatedPost = await PostModel.updatePost(id, payload);
    return res.json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
}

async function deletePost(req, res) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "Invalid post id." });
  }

  try {
    const post = await PostModel.getPostById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    await PostModel.deletePost(id);
    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting post:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
}

module.exports = {
  listPosts,
  getSinglePost,
  createPost,
  updatePost,
  deletePost,
};
