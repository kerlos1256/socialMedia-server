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
exports.PostsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const posts_service_1 = require("./posts.service");
const post_entity_1 = require("../entities/post.entity");
const create_post_input_1 = require("./dto/create-post.input");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const pubSub = new graphql_subscriptions_1.PubSub();
const NEW_POST_EVENT = 'postAdded';
const DELETED_POST_EVENT = 'postDeleted';
let PostsResolver = class PostsResolver {
    constructor(postsService) {
        this.postsService = postsService;
    }
    findPosts() {
        return this.postsService.findPosts();
    }
    getSinglePost(postUuid) {
        return this.postsService.getSinglePost(postUuid);
    }
    async createPost(createPostInput, ctx) {
        const newPost = this.postsService.createPost(createPostInput, ctx.req.headers);
        pubSub.publish(NEW_POST_EVENT, { postAdded: newPost });
        return newPost;
    }
    deletePost(postUuid, ctx) {
        const deletedPost = this.postsService.deletePost(postUuid, ctx.req.headers);
        pubSub.publish(DELETED_POST_EVENT, { postDeleted: deletedPost });
        return deletedPost;
    }
    postAdded() {
        return pubSub.asyncIterator(NEW_POST_EVENT);
    }
    postDeleted() {
        return pubSub.asyncIterator(DELETED_POST_EVENT);
    }
};
__decorate([
    graphql_1.Query(() => post_entity_1.Posts),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PostsResolver.prototype, "findPosts", null);
__decorate([
    graphql_1.Query(() => post_entity_1.Post),
    __param(0, graphql_1.Args('postUuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostsResolver.prototype, "getSinglePost", null);
__decorate([
    graphql_1.Mutation(() => post_entity_1.Post),
    __param(0, graphql_1.Args('createPostInput')),
    __param(1, graphql_1.Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_post_input_1.CreatePostInput, Object]),
    __metadata("design:returntype", Promise)
], PostsResolver.prototype, "createPost", null);
__decorate([
    graphql_1.Mutation(() => post_entity_1.Post),
    __param(0, graphql_1.Args('postUuid', { type: () => String })),
    __param(1, graphql_1.Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PostsResolver.prototype, "deletePost", null);
__decorate([
    graphql_1.Subscription(() => post_entity_1.Post),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PostsResolver.prototype, "postAdded", null);
__decorate([
    graphql_1.Subscription(() => post_entity_1.Post),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PostsResolver.prototype, "postDeleted", null);
PostsResolver = __decorate([
    graphql_1.Resolver(() => post_entity_1.Post),
    __metadata("design:paramtypes", [posts_service_1.PostsService])
], PostsResolver);
exports.PostsResolver = PostsResolver;
//# sourceMappingURL=posts.resolver.js.map