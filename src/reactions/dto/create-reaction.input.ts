import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class PostReactionInput {
  @Field()
  postUuid: string
  @Field()
  type: string
}

@InputType()
export class CommentReactionInput {
  @Field()
  commentUuid: string
  @Field()
  type: string
}
