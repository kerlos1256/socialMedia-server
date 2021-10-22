import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Comment } from './comment.entity';
import { Post } from './post.entity';
import { Reactions } from './reaction.entity';

@ObjectType()
export class User {
  @Field(()=> Number)
  id: number
  
  @Field(()=> String)
  uuid: string

  @Field(()=> String)
  username: string

  @Field(()=> String)
  email: string
  
  @Field(()=> String)
  bio: string

  @Field(()=> Date)
  createdAt: Date

  @Field(()=> Date)
  updateAt: Date

  @Field(()=> [Post])
  posts: Post[]

  @Field(()=> [Comment])
  comments: Comment[]

  @Field(()=> Reactions)
  reactions: Reactions 
}
