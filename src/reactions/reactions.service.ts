import { Injectable } from '@nestjs/common';
import { CommentReactionInput, PostReactionInput } from './dto/create-reaction.input';
import { prisma, PrismaClient } from '@prisma/client';
import { PostReaction } from 'src/entities/reaction.entity';
import check_Auth from 'src/utils/check_Auth';


@Injectable()
export class ReactionsService {
  private readonly prisma = new PrismaClient()
  
  // Post Reactions
  async reactOnPost(postReactionInput: PostReactionInput,headers: Headers){
    const {id,uuid} = check_Auth(headers)
    
    const { postUuid , type} = postReactionInput
    
    const allowedReactions = ["like","love","funny","sad","angry"]
    
    const post = await this.prisma.post.findFirst({
      where:{uuid: postUuid},
      include:{reactions:true}
    })

    if(!post) throw new Error('post not found')
    
    if(!allowedReactions.includes(type))throw new Error('you cant react like that')
    
    const user = await this.prisma.user.findFirst({
      where:{uuid},
      include:{
        userReactions:true
      }
    })

      
     
  post.reactions.map(async (reaction,index)=>{
    if(reaction.reactionId === user.userReactions.id){
      const Res = await this.prisma.postReaction.delete({
        where:{id: reaction.id},
        include:{reaction:{include:{user:true}},post:true}
      })
      return Res
    }
  })
    

    const reaction = await this.prisma.postReaction.create({
      data:{reactionId: user.userReactions.id, postId:post.id,type},
      include:{reaction:{
        include:{
          user:true
        }
      },post:true}
    })
    
    return reaction;
  }

  async getPostReactions(postId:number) {
    const post = await this.prisma.post.findFirst({
      where:{id:postId}
    })

    if(!post) throw new Error('post not found')

    const reactions = await this.prisma.postReaction.findMany({
      where:{postId},
      include:{reaction:{include:{user:true}},post:true}
    }) 
    
    return reactions;
  }

// Comment Reactions

  async reactOnComment(commentReactionInput: CommentReactionInput,headers: Headers){
    const {id,uuid} = check_Auth(headers)
    
    const { commentUuid , type} = commentReactionInput
    
    const allowedReactions = ["like","love","funny","sad","angry"]
    
    const comment = await this.prisma.comment.findFirst({
      where:{uuid: commentUuid},
      include:{reactions:true}
    })
    
    if(!comment) throw new Error('comment not found')
    
    if(!allowedReactions.includes(type))throw new Error('you cant react like that')
    
    const user = await this.prisma.user.findFirst({
      where:{uuid},include:{userReactions:true}
    })

    if(comment.reactions.find(reaction => reaction.reactionId === user.userReactions.id)) {
      
      const reaction = await this.prisma.commentReaction.findFirst({
        where:{reactionId:user.userReactions.id},
        include:{reaction:{include:{user:true}},comment:true}
      })
      
      await this.prisma.commentReaction.deleteMany({
        where:{reactionId: user.userReactions.id},
      })
      
      return reaction
    }
    
    const reaction = await this.prisma.commentReaction.create({
      data:{reactionId: user.userReactions.id, commentId: comment.id, type},
      include:{reaction:{include:{user:true}}, comment:true}
    })
    
    return reaction;
  }

  async getCommentReactions(commentId:number) {
    const comment = await this.prisma.comment.findFirst({
      where:{id:commentId}
    })

    if(!comment) throw new Error('comment not found')

    const reactions = await this.prisma.commentReaction.findMany({
      where:{commentId},
      include:{reaction:{include:{user:true}},comment:{include:{user:true}}}
    }) 
    
    return reactions;
  }

}
