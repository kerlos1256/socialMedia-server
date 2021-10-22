import { Resolver, Query, Mutation, Args, Context, Subscription } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post, Posts} from '../entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { PubSub } from 'graphql-subscriptions'

const pubSub = new PubSub()

const NEW_POST_EVENT = 'postAdded'

const DELETED_POST_EVENT = 'postDeleted'


@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}
  
  @Query(() => Posts)
  findPosts() {
    return this.postsService.findPosts();
  }
  
  @Query(() => Post)
  getSinglePost(@Args('postUuid') postUuid: string) {
    return this.postsService.getSinglePost(postUuid);
  }

  @Mutation(() => Post)
  async createPost(@Args('createPostInput') createPostInput: CreatePostInput,@Context() ctx) {
    const newPost = this.postsService.createPost(createPostInput,ctx.req.headers);
    pubSub.publish(NEW_POST_EVENT,{postAdded: newPost})
    return newPost
  }

  @Mutation(()=> Post)
  deletePost(@Args('postUuid',{type: ()=> String}) postUuid:string,@Context() ctx){
    const deletedPost = this.postsService.deletePost(postUuid,ctx.req.headers)
    pubSub.publish(DELETED_POST_EVENT,{postDeleted: deletedPost})
    return deletedPost
  }

  @Subscription(()=> Post)
  postAdded(){
    return pubSub.asyncIterator(NEW_POST_EVENT);
  }
  @Subscription(()=> Post)
  postDeleted(){
    return pubSub.asyncIterator(DELETED_POST_EVENT);
  }
}
