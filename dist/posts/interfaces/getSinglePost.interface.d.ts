export interface singlePost {
    reqKey: number;
    id: number;
    uuid: string;
    body: string;
    createdAt: Date;
    updateAt: Date;
    user: FindPostUser;
    userId: number;
    commentsLength: number;
    comments: Comment[];
    reactionsLength: number;
    reactions: Reactions[];
}
export interface Comment {
    id: number;
    uuid: string;
    body: string;
    createdAt: Date;
    updateAt: Date;
    user: CommentUser;
    reactionsLength: number;
    reactions: Reactions[];
}
export interface Reactions {
    id: number;
    uuid: string;
    type: string;
    createdAt: Date;
    updateAt: Date;
    reaction: ReactionReaction;
}
export interface ReactionReaction {
    user: ReactionUser;
}
export interface ReactionUser {
    id: number;
    username: string;
}
export interface CommentUser {
    id: number;
    uuid: string;
    username: string;
}
export interface FindPostUser {
    id: number;
    uuid: string;
    username: string;
    email: string;
    bio: string;
}
