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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = exports.Posts = void 0;
const graphql_1 = require("@nestjs/graphql");
const comment_entity_1 = require("./comment.entity");
const reaction_entity_1 = require("./reaction.entity");
const user_entity_1 = require("./user.entity");
let Posts = class Posts {
};
__decorate([
    graphql_1.Field(() => Number),
    __metadata("design:type", Number)
], Posts.prototype, "reqKey", void 0);
__decorate([
    graphql_1.Field(() => [Post]),
    __metadata("design:type", Array)
], Posts.prototype, "posts", void 0);
Posts = __decorate([
    graphql_1.ObjectType()
], Posts);
exports.Posts = Posts;
let Post = class Post {
};
__decorate([
    graphql_1.Field(() => Number),
    __metadata("design:type", Number)
], Post.prototype, "reqKey", void 0);
__decorate([
    graphql_1.Field(() => Number),
    __metadata("design:type", Number)
], Post.prototype, "id", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], Post.prototype, "uuid", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], Post.prototype, "body", void 0);
__decorate([
    graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], Post.prototype, "createdAt", void 0);
__decorate([
    graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], Post.prototype, "updateAt", void 0);
__decorate([
    graphql_1.Field(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Post.prototype, "user", void 0);
__decorate([
    graphql_1.Field(() => Number),
    __metadata("design:type", Number)
], Post.prototype, "userId", void 0);
__decorate([
    graphql_1.Field(() => [comment_entity_1.Comment]),
    __metadata("design:type", Array)
], Post.prototype, "comments", void 0);
__decorate([
    graphql_1.Field(() => Number),
    __metadata("design:type", Number)
], Post.prototype, "commentsLength", void 0);
__decorate([
    graphql_1.Field(() => [reaction_entity_1.PostReaction]),
    __metadata("design:type", Array)
], Post.prototype, "reactions", void 0);
__decorate([
    graphql_1.Field(() => Number),
    __metadata("design:type", Number)
], Post.prototype, "reactionsLength", void 0);
Post = __decorate([
    graphql_1.ObjectType()
], Post);
exports.Post = Post;
//# sourceMappingURL=post.entity.js.map