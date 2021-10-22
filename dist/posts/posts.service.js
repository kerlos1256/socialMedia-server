"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const post_entity_1 = require("../entities/post.entity");
const check_Auth_1 = require("../utils/check_Auth");
const prisma = new client_1.PrismaClient();
let PostsService = class PostsService {
    async createPost(createPostInput, headers) {
        const { body } = createPostInput;
        const { uuid, id } = check_Auth_1.default(headers);
        const user = await prisma.user.findFirst({
            where: { uuid }
        });
        if (!user)
            throw new Error('user not found');
        const post = await prisma.post.create({
            data: { body, userId: id },
            include: {
                user: true,
                comments: {
                    include: {
                        user: true,
                        reactions: {
                            include: {
                                reaction: {
                                    include: {
                                        user: true
                                    }
                                }
                            }
                        }
                    }
                },
                reactions: {
                    include: {
                        reaction: {
                            include: {
                                user: true
                            }
                        }
                    }
                }
            }
        });
        return post;
    }
    async deletePost(postUuid, headers) {
        const user = check_Auth_1.default(headers);
        const post = await prisma.post.findFirst({
            where: { uuid: postUuid },
            include: { user: true }
        });
        if (!post)
            throw new Error('post not found');
        if (post.user.uuid !== user.uuid)
            throw new Error('you cant delete someone eles post');
        await prisma.post.delete({
            where: { uuid: postUuid }
        });
        return post;
    }
    async findPosts() {
        const posts = await prisma.post.findMany({
            include: {
                user: true,
                comments: {
                    include: {
                        user: true,
                        reactions: {
                            include: {
                                reaction: {
                                    include: {
                                        user: true
                                    }
                                }
                            }
                        }
                    }
                },
                reactions: {
                    include: {
                        reaction: {
                            include: {
                                user: true
                            }
                        }
                    }
                }
            }
        });
        return { reqKey: Math.random(), posts: posts.reverse() };
    }
    async getSinglePost(postUuid) {
        try {
            const post = await prisma.post.findUnique({
                where: { uuid: postUuid },
                include: { user: true,
                    comments: { include: {
                            user: true,
                            reactions: { include: {
                                    reaction: { include: {
                                            user: true
                                        } }
                                }
                            }
                        },
                    },
                    reactions: { include: {
                            reaction: { include: {
                                    user: true
                                } }
                        } }
                }
            });
            return Object.assign(Object.assign({}, post), { reqKey: Math.random() });
        }
        catch (_a) {
            throw new Error('post not found');
        }
    }
};
PostsService = __decorate([
    common_1.Injectable()
], PostsService);
exports.PostsService = PostsService;
//# sourceMappingURL=posts.service.js.map