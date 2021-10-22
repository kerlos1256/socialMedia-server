import { Comment } from './comment.entity';
import { Post } from './post.entity';
import { Reactions } from './reaction.entity';
export declare class User {
    id: number;
    uuid: string;
    username: string;
    email: string;
    bio: string;
    createdAt: Date;
    updateAt: Date;
    posts: Post[];
    comments: Comment[];
    reactions: Reactions;
}
