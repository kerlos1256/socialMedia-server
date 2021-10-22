"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const reaction_entity_1 = require("../entities/reaction.entity");
const check_Auth_1 = require("../utils/check_Auth");
let ReactionsService = class ReactionsService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async reactOnPost(postReactionInput, headers) {
        const { id, uuid } = check_Auth_1.default(headers);
        const { postUuid, type } = postReactionInput;
        const allowedReactions = ["like", "love", "funny", "sad", "angry"];
        const post = await this.prisma.post.findFirst({
            where: { uuid: postUuid },
            include: { reactions: true }
        });
        if (!post)
            throw new Error('post not found');
        if (!allowedReactions.includes(type))
            throw new Error('you cant react like that');
        const user = await this.prisma.user.findFirst({
            where: { uuid },
            include: {
                userReactions: true
            }
        });
        post.reactions.map(async (reaction, index) => {
            if (reaction.reactionId === user.userReactions.id) {
                const Res = await this.prisma.postReaction.delete({
                    where: { id: reaction.id },
                    include: { reaction: { include: { user: true } }, post: true }
                });
                return Res;
            }
        });
        const reaction = await this.prisma.postReaction.create({
            data: { reactionId: user.userReactions.id, postId: post.id, type },
            include: { reaction: {
                    include: {
                        user: true
                    }
                }, post: true }
        });
        return reaction;
    }
    async getPostReactions(postId) {
        const post = await this.prisma.post.findFirst({
            where: { id: postId }
        });
        if (!post)
            throw new Error('post not found');
        const reactions = await this.prisma.postReaction.findMany({
            where: { postId },
            include: { reaction: { include: { user: true } }, post: true }
        });
        return reactions;
    }
    async reactOnComment(commentReactionInput, headers) {
        const { id, uuid } = check_Auth_1.default(headers);
        const { commentUuid, type } = commentReactionInput;
        const allowedReactions = ["like", "love", "funny", "sad", "angry"];
        const comment = await this.prisma.comment.findFirst({
            where: { uuid: commentUuid },
            include: { reactions: true }
        });
        if (!comment)
            throw new Error('comment not found');
        if (!allowedReactions.includes(type))
            throw new Error('you cant react like that');
        const user = await this.prisma.user.findFirst({
            where: { uuid }, include: { userReactions: true }
        });
        if (comment.reactions.find(reaction => reaction.reactionId === user.userReactions.id)) {
            const reaction = await this.prisma.commentReaction.findFirst({
                where: { reactionId: user.userReactions.id },
                include: { reaction: { include: { user: true } }, comment: true }
            });
            await this.prisma.commentReaction.deleteMany({
                where: { reactionId: user.userReactions.id },
            });
            return reaction;
        }
        const reaction = await this.prisma.commentReaction.create({
            data: { reactionId: user.userReactions.id, commentId: comment.id, type },
            include: { reaction: { include: { user: true } }, comment: true }
        });
        return reaction;
    }
    async getCommentReactions(commentId) {
        const comment = await this.prisma.comment.findFirst({
            where: { id: commentId }
        });
        if (!comment)
            throw new Error('comment not found');
        const reactions = await this.prisma.commentReaction.findMany({
            where: { commentId },
            include: { reaction: { include: { user: true } }, comment: { include: { user: true } } }
        });
        return reactions;
    }
};
ReactionsService = __decorate([
    common_1.Injectable()
], ReactionsService);
exports.ReactionsService = ReactionsService;
//# sourceMappingURL=reactions.service.js.map