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
exports.ReactionsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const reactions_service_1 = require("./reactions.service");
const reaction_entity_1 = require("../entities/reaction.entity");
const create_reaction_input_1 = require("./dto/create-reaction.input");
let ReactionsResolver = class ReactionsResolver {
    constructor(reactionsService) {
        this.reactionsService = reactionsService;
    }
    reactOnPost(postReactionInput, ctx) {
        return this.reactionsService.reactOnPost(postReactionInput, ctx.req.headers);
    }
    getPostReactions(postId) {
        return this.reactionsService.getPostReactions(postId);
    }
    reactOnComment(commentReactionInput, ctx) {
        return this.reactionsService.reactOnComment(commentReactionInput, ctx.req.headers);
    }
    getCommentReactions(CommentId) {
        return this.reactionsService.getCommentReactions(CommentId);
    }
};
__decorate([
    graphql_1.Mutation(() => reaction_entity_1.PostReaction),
    __param(0, graphql_1.Args('PostReactionInput')),
    __param(1, graphql_1.Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_reaction_input_1.PostReactionInput, Object]),
    __metadata("design:returntype", void 0)
], ReactionsResolver.prototype, "reactOnPost", null);
__decorate([
    graphql_1.Query(() => [reaction_entity_1.PostReaction]),
    __param(0, graphql_1.Args('PostId', { type: () => Number })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ReactionsResolver.prototype, "getPostReactions", null);
__decorate([
    graphql_1.Mutation(() => reaction_entity_1.CommentReaction),
    __param(0, graphql_1.Args('CommentReactionInput')),
    __param(1, graphql_1.Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_reaction_input_1.CommentReactionInput, Object]),
    __metadata("design:returntype", void 0)
], ReactionsResolver.prototype, "reactOnComment", null);
__decorate([
    graphql_1.Query(() => [reaction_entity_1.CommentReaction]),
    __param(0, graphql_1.Args('CommentId', { type: () => Number })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ReactionsResolver.prototype, "getCommentReactions", null);
ReactionsResolver = __decorate([
    graphql_1.Resolver(() => reaction_entity_1.PostReaction || reaction_entity_1.CommentReaction),
    __metadata("design:paramtypes", [reactions_service_1.ReactionsService])
], ReactionsResolver);
exports.ReactionsResolver = ReactionsResolver;
//# sourceMappingURL=reactions.resolver.js.map