import { Comment } from './comment.entity';
import { Post } from './post.entity';
import { User } from './user.entity';
export declare class Reactions {
    id: number;
    uuid: string;
    postsReactions: PostReaction[];
    postsReactionsLength: number;
    commentReactions: CommentReaction[];
    commentReactionsLength: number;
    user: User;
    userId: number;
}
export declare class PostReaction {
    id: number;
    uuid: string;
    type: string;
    createdAt: Date;
    updateAt: Date;
    reaction: Reactions;
    reactionId: number;
    post: Post;
    postId: number;
}
export declare class CommentReaction {
    id: number;
    uuid: string;
    type: string;
    createdAt: Date;
    updateAt: Date;
    reaction: Reactions;
    reactionId: number;
    comment: Comment;
    commentId: number;
}
