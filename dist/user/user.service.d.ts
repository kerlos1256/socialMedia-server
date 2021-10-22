import 'dotenv';
import { CreateUserInput } from './dto/create-user.input';
import { LoginUserInput } from './dto/login-user.input';
export declare class UserService {
    generateToken(user: any): any;
    Register(createUserInput: CreateUserInput): Promise<{
        user: import(".prisma/client").User & {
            posts: import(".prisma/client").Post[];
        };
        token: any;
    }>;
    DeleteUser(id: number): Promise<import(".prisma/client").User & {
        userReactions: import(".prisma/client").Reactions;
    }>;
    Login(loginInput: LoginUserInput): Promise<{
        user: import(".prisma/client").User & {
            posts: (import(".prisma/client").Post & {
                comments: import(".prisma/client").Comment[];
                reactions: import(".prisma/client").PostReaction[];
            })[];
            comments: (import(".prisma/client").Comment & {
                reactions: import(".prisma/client").CommentReaction[];
            })[];
            userReactions: import(".prisma/client").Reactions & {
                postsReactions: import(".prisma/client").PostReaction[];
                commentReactions: import(".prisma/client").CommentReaction[];
            };
        };
        token: any;
    }>;
    getUsers(): Promise<(import(".prisma/client").User & {
        posts: (import(".prisma/client").Post & {
            comments: import(".prisma/client").Comment[];
            reactions: import(".prisma/client").PostReaction[];
        })[];
        comments: (import(".prisma/client").Comment & {
            reactions: import(".prisma/client").CommentReaction[];
        })[];
        userReactions: import(".prisma/client").Reactions & {
            postsReactions: import(".prisma/client").PostReaction[];
            commentReactions: import(".prisma/client").CommentReaction[];
        };
    })[]>;
}
