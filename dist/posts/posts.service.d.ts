import { CreatePostInput } from './dto/create-post.input';
import { singlePost } from './interfaces/getSinglePost.interface';
export declare class PostsService {
    createPost(createPostInput: CreatePostInput, headers: any): Promise<import(".prisma/client").Post & {
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
    deletePost(postUuid: string, headers: any): Promise<import(".prisma/client").Post & {
        user: import(".prisma/client").User;
    }>;
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
    getSinglePost(postUuid: string): Promise<singlePost>;
}
