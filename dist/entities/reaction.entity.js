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
exports.CommentReaction = exports.PostReaction = exports.Reactions = void 0;
const graphql_1 = require("@nestjs/graphql");
const comment_entity_1 = require("./comment.entity");
const post_entity_1 = require("./post.entity");
const user_entity_1 = require("./user.entity");
let Reactions = class Reactions {
};
__decorate([
    graphql_1.Field(() => Number),
    __metadata("design:type", Number)
], Reactions.prototype, "id", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], Reactions.prototype, "uuid", void 0);
__decorate([
    graphql_1.Field(() => [PostReaction]),
    __metadata("design:type", Array)
], Reactions.prototype, "postsReactions", void 0);
__decorate([
    graphql_1.Field(() => Number),
    __metadata("design:type", Number)
], Reactions.prototype, "postsReactionsLength", void 0);
__decorate([
    graphql_1.Field(() => [CommentReaction]),
    __metadata("design:type", Array)
], Reactions.prototype, "commentReactions", void 0);
__decorate([
    graphql_1.Field(() => Number),
    __metadata("design:type", Number)
], Reactions.prototype, "commentReactionsLength", void 0);
__decorate([
    graphql_1.Field(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Reactions.prototype, "user", void 0);
__decorate([
    graphql_1.Field(() => Number),
    __metadata("design:type", Number)
], Reactions.prototype, "userId", void 0);
Reactions = __decorate([
    graphql_1.ObjectType()
], Reactions);
exports.Reactions = Reactions;
let PostReaction = class PostReaction {
};
__decorate([
    graphql_1.Field(() => Number),
    __metadata("design:type", Number)
], PostReaction.prototype, "id", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], PostReaction.prototype, "uuid", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], PostReaction.prototype, "type", void 0);
__decorate([
    graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], PostReaction.prototype, "createdAt", void 0);
__decorate([
    graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], PostReaction.prototype, "updateAt", void 0);
__decorate([
    graphql_1.Field(() => Reactions),
    __metadata("design:type", Reactions)
], PostReaction.prototype, "reaction", void 0);
__decorate([
    graphql_1.Field(() => Number),
    __metadata("design:type", Number)
], PostReaction.prototype, "reactionId", void 0);
__decorate([
    graphql_1.Field(() => post_entity_1.Post),
    __metadata("design:type", post_entity_1.Post)
], PostReaction.prototype, "post", void 0);
__decorate([
    graphql_1.Field(() => Number),
    __metadata("design:type", Number)
], PostReaction.prototype, "postId", void 0);
PostReaction = __decorate([
    graphql_1.ObjectType()
], PostReaction);
exports.PostReaction = PostReaction;
let CommentReaction = class CommentReaction {
};
__decorate([
    graphql_1.Field(() => Number),
    __metadata("design:type", Number)
], CommentReaction.prototype, "id", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], CommentReaction.prototype, "uuid", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], CommentReaction.prototype, "type", void 0);
__decorate([
    graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], CommentReaction.prototype, "createdAt", void 0);
__decorate([
    graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], CommentReaction.prototype, "updateAt", void 0);
__decorate([
    graphql_1.Field(() => Reactions),
    __metadata("design:type", Reactions)
], CommentReaction.prototype, "reaction", void 0);
__decorate([
    graphql_1.Field(() => Number),
    __metadata("design:type", Number)
], CommentReaction.prototype, "reactionId", void 0);
__decorate([
    graphql_1.Field(() => comment_entity_1.Comment),
    __metadata("design:type", comment_entity_1.Comment)
], CommentReaction.prototype, "comment", void 0);
__decorate([
    graphql_1.Field(() => Number),
    __metadata("design:type", Number)
], CommentReaction.prototype, "commentId", void 0);
CommentReaction = __decorate([
    graphql_1.ObjectType()
], CommentReaction);
exports.CommentReaction = CommentReaction;
//# sourceMappingURL=reaction.entity.js.map