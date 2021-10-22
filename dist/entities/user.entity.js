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
exports.User = void 0;
const graphql_1 = require("@nestjs/graphql");
const comment_entity_1 = require("./comment.entity");
const post_entity_1 = require("./post.entity");
const reaction_entity_1 = require("./reaction.entity");
let User = class User {
};
__decorate([
    graphql_1.Field(() => Number),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], User.prototype, "uuid", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], User.prototype, "bio", void 0);
__decorate([
    graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], User.prototype, "updateAt", void 0);
__decorate([
    graphql_1.Field(() => [post_entity_1.Post]),
    __metadata("design:type", Array)
], User.prototype, "posts", void 0);
__decorate([
    graphql_1.Field(() => [comment_entity_1.Comment]),
    __metadata("design:type", Array)
], User.prototype, "comments", void 0);
__decorate([
    graphql_1.Field(() => reaction_entity_1.Reactions),
    __metadata("design:type", reaction_entity_1.Reactions)
], User.prototype, "reactions", void 0);
User = __decorate([
    graphql_1.ObjectType()
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map