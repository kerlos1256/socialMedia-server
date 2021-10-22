import { User } from 'src/user/entities/user.entity';
export declare class Post {
    id: number;
    uuid: string;
    body: string;
    userId: number;
    user: User;
}
