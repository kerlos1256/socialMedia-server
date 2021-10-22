import 'dotenv'
import * as jwt from 'jsonwebtoken'
import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { PrismaClient } from '@prisma/client'
import { LoginUserInput } from './dto/login-user.input';

const prisma = new PrismaClient()

@Injectable()
export class UserService {

  generateToken(user) {
    return jwt.sign({
        id: user.id,
        uuid: user.uuid,
        email: user.email,
        username: user.username
    }, process.env.SECRET_KEY, {expiresIn: '24h'});
}


  async Register(createUserInput: CreateUserInput) {
    const {username,email} = createUserInput
    
    const emailExist = await prisma.user.findFirst({
      where:{email}
    })
    
    if (emailExist) throw new Error('this email already in use')
    
    
    const usernameExist = await prisma.user.findFirst({
      where:{username}
    })
    
    if (usernameExist) throw new Error('this username is taken')
    
    
    const user = await  prisma.user.create({
      data:createUserInput,
      include: {posts: true}
    })

    await prisma.reactions.create({
      data:{userId: user.id}
    })
    
    const token = this.generateToken(user)
    
    return {user,token};
  }

  async DeleteUser(id: number){

    const user = await prisma.user.findFirst({
      where:{id},
      include:{userReactions:true}
    })

    await prisma.post.deleteMany({
      where:{userId: id}
    })
    await prisma.comment.deleteMany({
      where:{userId: id}
    })
    await prisma.reactions.delete({
      where:{uuid:user.userReactions.uuid}
    })
    await prisma.postReaction.deleteMany({
      where:{reactionId:user.userReactions.id}
    })
    await prisma.commentReaction.deleteMany({
      where:{reactionId:user.userReactions.id}
    })


    await prisma.user.delete({
      where:{id},
      include:{
        userReactions:{
          include:{postsReactions:true,
            commentReactions:true}
      },
        comments:{
        include:{reactions:true}
      },
        posts:{
        include:{
          comments:true,
          reactions:true
        }
      }}
    })


    return user
  }

  async Login(loginInput: LoginUserInput){

    const {username,password} = loginInput

    const user = await prisma.user.findFirst({
      where:{username,password},
      include:{
        userReactions:{
          include:{postsReactions:true,
            commentReactions:true}
      },
        comments:{
        include:{reactions:true}
      },
        posts:{
        include:{
          comments:true,
          reactions:true
        }
      }}
    })

    if(!user) throw new Error('wrong credintiles')
    
    const token = this.generateToken(user)
    
    return {user,token}
  }


  async getUsers() {

    const users = await prisma.user.findMany({
      include:{
        userReactions:{
          include:{postsReactions:true,
            commentReactions:true}
      },
        comments:{
        include:{reactions:true}
      },
        posts:{
        include:{
          comments:true,
          reactions:true
        }
      }}
    })

    return users;
  }
}
