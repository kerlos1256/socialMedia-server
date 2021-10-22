import { CommentReactionInput, PostReactionInput } from './dto/create-reaction.input';
export declare class ReactionsService {
    private readonly prisma;
    reactOnPost(postReactionInput: PostReactionInput, headers: Headers): Promise<import(".prisma/client").PostReaction & {
        reaction: import(".prisma/client").Reactions & {
            user: import(".prisma/client").User;
        };
        post: import(".prisma/client").Post;
    }>;
    getPostReactions(postId: number): Promise<(import(".prisma/client").PostReaction & {
        reaction: import(".prisma/client").Reactions & {
            user: import(".prisma/client").User;
        };
        post: import(".prisma/client").Post;
    })[]>;
    reactOnComment(commentReactionInput: CommentReactionInput, headers: Headers): Promise<import(".prisma/client").CommentReaction & {
        reaction: import(".prisma/client").Reactions & {
            user: import(".prisma/client").User;
        };
        comment: import(".prisma/client").Comment;
    }>;
    getCommentReactions(commentId: number): Promise<(import(".prisma/client").CommentReaction & {
        reaction: import(".prisma/client").Reactions & {
            user: import(".prisma/client").User;
        };
        comment: import(".prisma/client").Comment & {
            user: import(".prisma/client").User;
        };
    })[]>;
}
