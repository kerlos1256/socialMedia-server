import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Comment } from './comment.entity';
import { Post } from './post.entity';
import { User } from './user.entity';


@ObjectType()
export class Reactions {
  @Field(()=> Number)
  id: number

  @Field(()=> String)
  uuid: string

  @Field(()=> [PostReaction])
  postsReactions: PostReaction[]

  @Field(()=> Number)
  postsReactionsLength: number

  @Field(()=> [CommentReaction])
  commentReactions: CommentReaction[]

  @Field(()=> Number)
  commentReactionsLength:number
  
  @Field(()=> User)
  user: User

  @Field(()=> Number)
  userId: number
}



@ObjectType()
export class PostReaction {
  @Field(()=> Number)
  id: number

  @Field(()=> String)
  uuid: string

  @Field(()=> String)
  type: string

  @Field(()=> Date)
  createdAt: Date

  @Field(()=> Date)
  updateAt: Date
  
  @Field(()=> Reactions)
  reaction: Reactions

  @Field(()=> Number)
  reactionId: number
  
  @Field(()=> Post)
  post: Post

  @Field(()=> Number)
  postId: number

}

@ObjectType()
export class CommentReaction {
  @Field(()=> Number)
  id: number

  @Field(()=> String)
  uuid: string

  @Field(()=> String)
  type: string

  @Field(()=> Date)
  createdAt: Date

  @Field(()=> Date)
  updateAt: Date
  
  @Field(()=> Reactions)
  reaction: Reactions

  @Field(()=> Number)
  reactionId: number
  
  @Field(()=> Comment)
  comment: Comment

  @Field(()=> Number)
  commentId: number
  
}