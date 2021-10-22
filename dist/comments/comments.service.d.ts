import { CreateCommentInput } from './dto/create-comment.input';
export declare class CommentsService {
    createComment(createCommentInput: CreateCommentInput, headers: any): Promise<import(".prisma/client").Comment & {
        user: import(".prisma/client").User;
        post: import(".prisma/client").Post & {
            user: import(".prisma/client").User;
        };
        reactions: (import(".prisma/client").CommentReaction & {
            reaction: import(".prisma/client").Reactions & {
                user: import(".prisma/client").User;
            };
        })[];
    }>;
    deleteComment(commentUuid: string, headers: any): Promise<import(".prisma/client").Comment & {
        user: import(".prisma/client").User;
        post: import(".prisma/client").Post;
    }>;
    findCommentsOfPost(postUuid: string): Promise<(import(".prisma/client").Comment & {
        user: import(".prisma/client").User;
        post: import(".prisma/client").Post;
        reactions: (import(".prisma/client").CommentReaction & {
            reaction: import(".prisma/client").Reactions & {
                user: import(".prisma/client").User;
            };
        })[];
    })[]>;
}
