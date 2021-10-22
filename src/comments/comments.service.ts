import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import check_Auth from 'src/utils/check_Auth';
import { CreateCommentInput } from './dto/create-comment.input';

const prisma = new PrismaClient()

@Injectable()
export class CommentsService {

  async createComment(createCommentInput: CreateCommentInput,headers) {
    const user = check_Auth(headers)
    const { postId , body} = createCommentInput
    const post = await prisma.post.findFirst({
      where:{id:postId},
      include:{comments:true}
    })
    if (!post) throw new Error('post not found')
      const comment = await prisma.comment.create({
        data:{body,postId,userId:user.id},
        include:{post:{include:{user:true}},user:true,reactions:{include:{reaction:{include:{user:true}}}}}
      })
      await prisma.post.update({
        where:{id: postId},
        data:{commentsLength: comment.post.commentsLength + 1}
      })
      return comment
  }

  async deleteComment(commentUuid:string,headers){
    const user = check_Auth(headers)
    const comment = await prisma.comment.findFirst({
      where:{uuid:commentUuid},
      include:{user:true,post:true}
    })
    if(!comment) throw new Error('comment not found')
    if(comment.user.uuid !== user.uuid) throw new Error('you cant delete someone eles comment')
    
    await prisma.commentReaction.deleteMany({
      where:{commentId: comment.id}
    })
    await prisma.comment.delete({
      where:{id: comment.id}
    })
    await prisma.post.update({
      where:{uuid: comment.post.uuid},
      data:{commentsLength: comment.post.commentsLength -1}
    })
    return comment
  }



  async findCommentsOfPost(postUuid: string) {
    const post = await  prisma.post.findFirst({
      where:{uuid: postUuid}
    })
    if(!post) throw new Error('post not found')
    const comments = await prisma.comment.findMany({
      where:{postId: post.id},
      include:{post:true,user:true,reactions:{include:{reaction:{include:{user:true}}}}}
    })
    return  comments
  }
}
