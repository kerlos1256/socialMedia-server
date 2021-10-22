import { Comment } from './comment.entity';
import { PostReaction } from './reaction.entity';
import { User } from './user.entity';
export declare class Posts {
    reqKey: number;
    posts: Post[];
}
export declare class Post {
    reqKey: number;
    id: number;
    uuid: string;
    body: string;
    createdAt: Date;
    updateAt: Date;
    user: User;
    userId: number;
    comments: Comment[];
    commentsLength: number;
    reactions: PostReaction[];
    reactionsLength: number;
}
