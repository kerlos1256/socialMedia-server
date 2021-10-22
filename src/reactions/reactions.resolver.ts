import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { ReactionsService } from './reactions.service';
import { PostReaction , CommentReaction } from '../entities/reaction.entity';
import { CommentReactionInput, PostReactionInput } from './dto/create-reaction.input';



@Resolver(() => PostReaction || CommentReaction)
export class ReactionsResolver {
  constructor(private readonly reactionsService: ReactionsService) {}

// Post Reactions
  @Mutation(() => PostReaction)
  reactOnPost(@Args('PostReactionInput') postReactionInput: PostReactionInput,@Context() ctx) {
    return this.reactionsService.reactOnPost(postReactionInput,ctx.req.headers);
  }

  @Query(() => [PostReaction])
  getPostReactions(@Args('PostId',{type:()=> Number}) postId: number) {
    return this.reactionsService.getPostReactions(postId);
  }

// Comment Reactions 
  @Mutation(() => CommentReaction)
  reactOnComment(@Args('CommentReactionInput') commentReactionInput: CommentReactionInput,@Context() ctx) {
    return this.reactionsService.reactOnComment(commentReactionInput,ctx.req.headers);
  }

  @Query(() => [CommentReaction])
  getCommentReactions(@Args('CommentId',{type:()=> Number}) CommentId: number) {
    return this.reactionsService.getCommentReactions(CommentId);
  }
}
