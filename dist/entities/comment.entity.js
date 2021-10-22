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
exports.Comment = void 0;
const graphql_1 = require("@nestjs/graphql");
const post_entity_1 = require("./post.entity");
const reaction_entity_1 = require("./reaction.entity");
const user_entity_1 = require("./user.entity");
let Comment = class Comment {
};
__decorate([
    graphql_1.Field(() => Number),
    __metadata("design:type", Number)
], Comment.prototype, "id", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], Comment.prototype, "uuid", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], Comment.prototype, "body", void 0);
__decorate([
    graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], Comment.prototype, "createdAt", void 0);
__decorate([
    graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], Comment.prototype, "updateAt", void 0);
__decorate([
    graphql_1.Field(() => post_entity_1.Post),
    __metadata("design:type", post_entity_1.Post)
], Comment.prototype, "post", void 0);
__decorate([
    graphql_1.Field(() => Number),
    __metadata("design:type", Number)
], Comment.prototype, "postId", void 0);
__decorate([
    graphql_1.Field(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Comment.prototype, "user", void 0);
__decorate([
    graphql_1.Field(() => Number),
    __metadata("design:type", Number)
], Comment.prototype, "userId", void 0);
__decorate([
    graphql_1.Field(() => [reaction_entity_1.CommentReaction]),
    __metadata("design:type", Array)
], Comment.prototype, "reactions", void 0);
__decorate([
    graphql_1.Field(() => Number),
    __metadata("design:type", Number)
], Comment.prototype, "reactionsLength", void 0);
Comment = __decorate([
    graphql_1.ObjectType()
], Comment);
exports.Comment = Comment;
//# sourceMappingURL=comment.entity.js.map