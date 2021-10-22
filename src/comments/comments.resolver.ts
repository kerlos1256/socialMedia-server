import { Resolver, Query, Mutation, Args, Int, Context, Subscription } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { Comment } from '../entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { PubSub } from 'graphql-subscriptions'


const pubsub = new PubSub()

const new_comment = 'NEW_COMMENT'

const comment_deleted= 'COMMENT_DELETED'

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Mutation(() => Comment)
  async createComment(@Args('createCommentInput') createCommentInput: CreateCommentInput,@Context() ctx) {
    return this.commentsService.createComment(createCommentInput,ctx.req.headers).then((comment)=>{      
      pubsub.publish(`${new_comment}-postUuid:${comment.post.uuid}`,{commentAdded: comment})
      return comment
    });
  }

  @Mutation(() => Comment)
  async deleteComment(@Args('commentUuid') commentUuid: string ,@Context() ctx) {
    return this.commentsService.deleteComment(commentUuid,ctx.req.headers).then((comment)=>{
      pubsub.publish(`${comment_deleted}-postUuid:${comment.post.uuid}`,{commentDeleted: comment})
      return comment 
    })
  }
  

  @Query(() => [Comment])
  findCommentsOfPost(@Args('postUuid') postUuid: string) {
    return this.commentsService.findCommentsOfPost(postUuid);
  }

  @Subscription(()=> Comment)
  commentAdded(@Args('postUuid') postUuid: string){
    return pubsub.asyncIterator(`${new_comment}-postUuid:${postUuid}`)
  }

  @Subscription(()=> Comment)
  commentDeleted(@Args('postUuid') postUuid: string){
    return pubsub.asyncIterator(`${comment_deleted}-postUuid:${postUuid}`)
  }
}
