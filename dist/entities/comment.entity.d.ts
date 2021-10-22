import { Post } from './post.entity';
import { CommentReaction } from './reaction.entity';
import { User } from './user.entity';
export declare class Comment {
    id: number;
    uuid: string;
    body: string;
    createdAt: Date;
    updateAt: Date;
    post: Post;
    postId: number;
    user: User;
    userId: number;
    reactions: CommentReaction[];
    reactionsLength: number;
}
