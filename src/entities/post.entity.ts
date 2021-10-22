import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Comment } from './comment.entity';
import { PostReaction } from './reaction.entity';
import { User } from './user.entity';

@ObjectType()
export class Posts {
  @Field(()=> Number)
  reqKey: number
  @Field(()=> [Post])
  posts: Post[]
}


@ObjectType()
export class Post {
  @Field(()=> Number)
  reqKey: number

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

  @Field(()=> User)
  user: User

  @Field(()=> Number)
  userId: number
  
  @Field(()=> [Comment])
  comments: Comment[]
  
  @Field(()=> Number)
  commentsLength: number

  @Field(()=> [PostReaction])
  reactions: PostReaction[]

  @Field(()=> Number)
  reactionsLength: number

}
