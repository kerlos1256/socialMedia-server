"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const check_Auth_1 = require("../utils/check_Auth");
const prisma = new client_1.PrismaClient();
let CommentsService = class CommentsService {
    async createComment(createCommentInput, headers) {
        const user = check_Auth_1.default(headers);
        const { postId, body } = createCommentInput;
        const post = await prisma.post.findFirst({
            where: { id: postId },
            include: { comments: true }
        });
        if (!post)
            throw new Error('post not found');
        const comment = await prisma.comment.create({
            data: { body, postId, userId: user.id },
            include: { post: { include: { user: true } }, user: true, reactions: { include: { reaction: { include: { user: true } } } } }
        });
        await prisma.post.update({
            where: { id: postId },
            data: { commentsLength: comment.post.commentsLength + 1 }
        });
        return comment;
    }
    async deleteComment(commentUuid, headers) {
        const user = check_Auth_1.default(headers);
        const comment = await prisma.comment.findFirst({
            where: { uuid: commentUuid },
            include: { user: true, post: true }
        });
        if (!comment)
            throw new Error('comment not found');
        if (comment.user.uuid !== user.uuid)
            throw new Error('you cant delete someone eles comment');
        await prisma.commentReaction.deleteMany({
            where: { commentId: comment.id }
        });
        await prisma.comment.delete({
            where: { id: comment.id }
        });
        await prisma.post.update({
            where: { uuid: comment.post.uuid },
            data: { commentsLength: comment.post.commentsLength - 1 }
        });
        return comment;
    }
    async findCommentsOfPost(postUuid) {
        const post = await prisma.post.findFirst({
            where: { uuid: postUuid }
        });
        if (!post)
            throw new Error('post not found');
        const comments = await prisma.comment.findMany({
            where: { postId: post.id },
            include: { post: true, user: true, reactions: { include: { reaction: { include: { user: true } } } } }
        });
        return comments;
    }
};
CommentsService = __decorate([
    common_1.Injectable()
], CommentsService);
exports.CommentsService = CommentsService;
//# sourceMappingURL=comments.service.js.map