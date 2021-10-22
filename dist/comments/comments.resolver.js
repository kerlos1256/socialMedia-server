"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const comments_service_1 = require("./comments.service");
const comment_entity_1 = require("../entities/comment.entity");
const create_comment_input_1 = require("./dto/create-comment.input");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const pubsub = new graphql_subscriptions_1.PubSub();
const new_comment = 'NEW_COMMENT';
const comment_deleted = 'COMMENT_DELETED';
let CommentsResolver = class CommentsResolver {
    constructor(commentsService) {
        this.commentsService = commentsService;
    }
    async createComment(createCommentInput, ctx) {
        return this.commentsService.createComment(createCommentInput, ctx.req.headers).then((comment) => {
            pubsub.publish(`${new_comment}-postUuid:${comment.post.uuid}`, { commentAdded: comment });
            return comment;
        });
    }
    async deleteComment(commentUuid, ctx) {
        return this.commentsService.deleteComment(commentUuid, ctx.req.headers).then((comment) => {
            pubsub.publish(`${comment_deleted}-postUuid:${comment.post.uuid}`, { commentDeleted: comment });
            return comment;
        });
    }
    findCommentsOfPost(postUuid) {
        return this.commentsService.findCommentsOfPost(postUuid);
    }
    commentAdded(postUuid) {
        return pubsub.asyncIterator(`${new_comment}-postUuid:${postUuid}`);
    }
    commentDeleted(postUuid) {
        return pubsub.asyncIterator(`${comment_deleted}-postUuid:${postUuid}`);
    }
};
__decorate([
    graphql_1.Mutation(() => comment_entity_1.Comment),
    __param(0, graphql_1.Args('createCommentInput')),
    __param(1, graphql_1.Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_comment_input_1.CreateCommentInput, Object]),
    __metadata("design:returntype", Promise)
], CommentsResolver.prototype, "createComment", null);
__decorate([
    graphql_1.Mutation(() => comment_entity_1.Comment),
    __param(0, graphql_1.Args('commentUuid')),
    __param(1, graphql_1.Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CommentsResolver.prototype, "deleteComment", null);
__decorate([
    graphql_1.Query(() => [comment_entity_1.Comment]),
    __param(0, graphql_1.Args('postUuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CommentsResolver.prototype, "findCommentsOfPost", null);
__decorate([
    graphql_1.Subscription(() => comment_entity_1.Comment),
    __param(0, graphql_1.Args('postUuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CommentsResolver.prototype, "commentAdded", null);
__decorate([
    graphql_1.Subscription(() => comment_entity_1.Comment),
    __param(0, graphql_1.Args('postUuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CommentsResolver.prototype, "commentDeleted", null);
CommentsResolver = __decorate([
    graphql_1.Resolver(() => comment_entity_1.Comment),
    __metadata("design:paramtypes", [comments_service_1.CommentsService])
], CommentsResolver);
exports.CommentsResolver = CommentsResolver;
//# sourceMappingURL=comments.resolver.js.map