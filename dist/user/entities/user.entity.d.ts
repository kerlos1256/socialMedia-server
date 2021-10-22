import { Post } from './post.entity';
export declare class User {
    id: number;
    uuid: string;
    username: string;
    email: string;
    bio: string;
    posts: Post[];
}
