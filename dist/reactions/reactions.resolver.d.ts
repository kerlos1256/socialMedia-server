import { ReactionsService } from './reactions.service';
import { CommentReactionInput, PostReactionInput } from './dto/create-reaction.input';
export declare class ReactionsResolver {
    private readonly reactionsService;
    constructor(reactionsService: ReactionsService);
    reactOnPost(postReactionInput: PostReactionInput, ctx: any): Promise<import(".prisma/client").PostReaction & {
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
    reactOnComment(commentReactionInput: CommentReactionInput, ctx: any): Promise<import(".prisma/client").CommentReaction & {
        reaction: import(".prisma/client").Reactions & {
            user: import(".prisma/client").User;
        };
        comment: import(".prisma/client").Comment;
    }>;
    getCommentReactions(CommentId: number): Promise<(import(".prisma/client").CommentReaction & {
        reaction: import(".prisma/client").Reactions & {
            user: import(".prisma/client").User;
        };
        comment: import(".prisma/client").Comment & {
            user: import(".prisma/client").User;
        };
    })[]>;
}
