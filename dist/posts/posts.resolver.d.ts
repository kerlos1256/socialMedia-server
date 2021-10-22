import { PostsService } from './posts.service';
import { CreatePostInput } from './dto/create-post.input';
export declare class PostsResolver {
    private readonly postsService;
    constructor(postsService: PostsService);
    findPosts(): Promise<{
        reqKey: number;
        posts: (import(".prisma/client").Post & {
            user: import(".prisma/client").User;
            comments: (import(".prisma/client").Comment & {
                user: import(".prisma/client").User;
                reactions: (import(".prisma/client").CommentReaction & {
                    reaction: import(".prisma/client").Reactions & {
                        user: import(".prisma/client").User;
                    };
                })[];
            })[];
            reactions: (import(".prisma/client").PostReaction & {
                reaction: import(".prisma/client").Reactions & {
                    user: import(".prisma/client").User;
                };
            })[];
        })[];
    }>;
    getSinglePost(postUuid: string): Promise<import("./interfaces/getSinglePost.interface").singlePost>;
    createPost(createPostInput: CreatePostInput, ctx: any): Promise<import(".prisma/client").Post & {
        user: import(".prisma/client").User;
        comments: (import(".prisma/client").Comment & {
            user: import(".prisma/client").User;
            reactions: (import(".prisma/client").CommentReaction & {
                reaction: import(".prisma/client").Reactions & {
                    user: import(".prisma/client").User;
                };
            })[];
        })[];
        reactions: (import(".prisma/client").PostReaction & {
            reaction: import(".prisma/client").Reactions & {
                user: import(".prisma/client").User;
            };
        })[];
    }>;
    deletePost(postUuid: string, ctx: any): Promise<import(".prisma/client").Post & {
        user: import(".prisma/client").User;
    }>;
    postAdded(): AsyncIterator<unknown, any, undefined>;
    postDeleted(): AsyncIterator<unknown, any, undefined>;
}
