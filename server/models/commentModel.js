const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const defaultInclude = {
  author: {
    select: {
      id: true,
      username: true,
    },
  },
  post: {
    select: {
      id: true,
      title: true,
    },
  },
};

class CommentModel {
  async createComment(data) {
    return prisma.comment.create({
      data: {
        content: data.content,
        lastEdit: data.lastEdit ?? null,
        post: { connect: { id: data.postId } },
        author: { connect: { id: data.authorId } },
      },
      include: defaultInclude,
    });
  }

  async getCommentById(id) {
    return prisma.comment.findUnique({
      where: { id },
      include: defaultInclude,
    });
  }

  async getAllComments(filters = {}) {
    return prisma.comment.findMany({
      where: filters,
      orderBy: { id: "desc" },
      include: defaultInclude,
    });
  }

  async updateComment(id, data) {
    return prisma.comment.update({
      where: { id },
      data,
      include: defaultInclude,
    });
  }

  async deleteComment(id) {
    return prisma.comment.delete({
      where: { id },
    });
  }
}

module.exports = new CommentModel();
