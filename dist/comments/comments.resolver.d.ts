import { CommentsService } from './comments.service';
import { CreateCommentInput } from './dto/create-comment.input';
export declare class CommentsResolver {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    createComment(createCommentInput: CreateCommentInput, ctx: any): Promise<import(".prisma/client").Comment & {
        post: import(".prisma/client").Post & {
            user: import(".prisma/client").User;
        };
        user: import(".prisma/client").User;
        reactions: (import(".prisma/client").CommentReaction & {
            reaction: import(".prisma/client").Reactions & {
                user: import(".prisma/client").User;
            };
        })[];
    }>;
    deleteComment(commentUuid: string, ctx: any): Promise<import(".prisma/client").Comment & {
        post: import(".prisma/client").Post;
        user: import(".prisma/client").User;
    }>;
    findCommentsOfPost(postUuid: string): Promise<(import(".prisma/client").Comment & {
        post: import(".prisma/client").Post;
        user: import(".prisma/client").User;
        reactions: (import(".prisma/client").CommentReaction & {
            reaction: import(".prisma/client").Reactions & {
                user: import(".prisma/client").User;
            };
        })[];
    })[]>;
    commentAdded(postUuid: string): AsyncIterator<unknown, any, undefined>;
    commentDeleted(postUuid: string): AsyncIterator<unknown, any, undefined>;
}
