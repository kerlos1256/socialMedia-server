"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
require("dotenv");
const jwt = require("jsonwebtoken");
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
let UserService = class UserService {
    generateToken(user) {
        return jwt.sign({
            id: user.id,
            uuid: user.uuid,
            email: user.email,
            username: user.username
        }, process.env.SECRET_KEY, { expiresIn: '24h' });
    }
    async Register(createUserInput) {
        const { username, email } = createUserInput;
        const emailExist = await prisma.user.findFirst({
            where: { email }
        });
        if (emailExist)
            throw new Error('this email already in use');
        const usernameExist = await prisma.user.findFirst({
            where: { username }
        });
        if (usernameExist)
            throw new Error('this username is taken');
        const user = await prisma.user.create({
            data: createUserInput,
            include: { posts: true }
        });
        await prisma.reactions.create({
            data: { userId: user.id }
        });
        const token = this.generateToken(user);
        return { user, token };
    }
    async DeleteUser(id) {
        const user = await prisma.user.findFirst({
            where: { id },
            include: { userReactions: true }
        });
        await prisma.post.deleteMany({
            where: { userId: id }
        });
        await prisma.comment.deleteMany({
            where: { userId: id }
        });
        await prisma.reactions.delete({
            where: { uuid: user.userReactions.uuid }
        });
        await prisma.postReaction.deleteMany({
            where: { reactionId: user.userReactions.id }
        });
        await prisma.commentReaction.deleteMany({
            where: { reactionId: user.userReactions.id }
        });
        await prisma.user.delete({
            where: { id },
            include: {
                userReactions: {
                    include: { postsReactions: true,
                        commentReactions: true }
                },
                comments: {
                    include: { reactions: true }
                },
                posts: {
                    include: {
                        comments: true,
                        reactions: true
                    }
                }
            }
        });
        return user;
    }
    async Login(loginInput) {
        const { username, password } = loginInput;
        const user = await prisma.user.findFirst({
            where: { username, password },
            include: {
                userReactions: {
                    include: { postsReactions: true,
                        commentReactions: true }
                },
                comments: {
                    include: { reactions: true }
                },
                posts: {
                    include: {
                        comments: true,
                        reactions: true
                    }
                }
            }
        });
        if (!user)
            throw new Error('wrong credintiles');
        const token = this.generateToken(user);
        return { user, token };
    }
    async getUsers() {
        const users = await prisma.user.findMany({
            include: {
                userReactions: {
                    include: { postsReactions: true,
                        commentReactions: true }
                },
                comments: {
                    include: { reactions: true }
                },
                posts: {
                    include: {
                        comments: true,
                        reactions: true
                    }
                }
            }
        });
        return users;
    }
};
UserService = __decorate([
    common_1.Injectable()
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map