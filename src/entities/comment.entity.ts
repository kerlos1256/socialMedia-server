import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from './post.entity';
import { CommentReaction } from './reaction.entity';
import { User } from './user.entity';

@ObjectType()
export class Comment {
  @Field(()=> Number)
  id: number

  @Field(()=> String)
  uuid: string

  @Field(()=> String)
  body: string
  
  @Field(()=> Date)
  createdAt: Date

  @Field(()=> Date)
  updateAt: Date

  @Field(()=> Post)
  post: Post

  @Field(()=> Number)
  postId: number
  
  @Field(()=> User)
  user: User

  @Field(()=> Number)
  userId: number

  @Field(()=> [CommentReaction])
  reactions: CommentReaction[]
  
  @Field(()=> Number)
  reactionsLength: number
}
