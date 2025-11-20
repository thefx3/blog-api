const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const defaultInclude = {
  author: {
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
    },
  },
  comments: {
    select: {
      id: true,
      content: true,
      createdAt: true,
      lastEdit: true,
      author: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  },
};

class PostModel {
  async createPost(data) {
    return prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        published: data.published ?? false,
        publishedAt: data.published ? new Date() : null,
        lastEdit: data.lastEdit ?? null,
        author: {
          connect: { id: data.authorId },
        },
      },
      include: defaultInclude,
    });
  }

  async getPostById(id) {
    return prisma.post.findUnique({
      where: { id },
      include: defaultInclude,
    });
  }

  async getAllPosts(filters = {}) {
    return prisma.post.findMany({
      where: filters,
      orderBy: { id: "desc" },
      include: defaultInclude,
    });
  }

  async updatePost(id, data) {
    return prisma.post.update({
      where: { id },
      data,
      include: defaultInclude,
    });
  }

  async deletePost(id) {
    return prisma.post.delete({
      where: { id },
    });
  }
}

module.exports = new PostModel();
