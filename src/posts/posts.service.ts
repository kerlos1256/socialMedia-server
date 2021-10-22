import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Post } from 'src/entities/post.entity';
import check_Auth from 'src/utils/check_Auth';
import { CreatePostInput } from './dto/create-post.input';
import { singlePost } from './interfaces/getSinglePost.interface';


const prisma = new PrismaClient()


@Injectable()
export class PostsService {
  async createPost(createPostInput: CreatePostInput, headers) {
    const { body } = createPostInput
    const {uuid,id} = check_Auth(headers)
    const user = await prisma.user.findFirst({
      where:{uuid}
    })
    if(!user) throw new Error('user not found')
    const post = await prisma.post.create({
      data:{body,userId:id},
      include:{
        user: true,
        comments:{
          include:{
            user:true,
            reactions:{
              include:{
                reaction:{
                  include:{
                    user:true
                  }
                }
              }
            }
          }
        },
        reactions:{
          include:{
            reaction:{
              include:{
                user:true
              }
            }
          }
        }
      }
    })
    return post;
  }

  async deletePost(postUuid: string,headers){
    const user = check_Auth(headers)
    
    const post = await prisma.post.findFirst({
      where:{uuid: postUuid},
      include:{user:true}
    })
    
    if(!post) throw new Error('post not found')
    
    if (post.user.uuid !== user.uuid) throw new Error('you cant delete someone eles post')
    
    await prisma.post.delete({
      where:{ uuid: postUuid }
    })
    
    return post;
  }

  async findPosts() {
    const posts = await prisma.post.findMany({
      include:{
        user: true,
        comments:{
          include:{
            user:true,
            reactions:{
              include:{
                reaction:{
                  include:{
                    user:true
                  }
                }
              }
            }
          }
        },
        reactions:{
          include:{
            reaction:{
              include:{
                user:true
              }
            }
          }
        }
      }
    })

    return {reqKey: Math.random(),posts: posts.reverse()};
  }
  async getSinglePost(postUuid: string):Promise<singlePost>{
    try {
      const post = await prisma.post.findUnique({
        where:{uuid:postUuid},
        include:{user:true,
          comments:{include:{
            user:true,
            reactions:{include:{
                reaction:{include:{
                  user:true}}
              }
            }
          },    
        },
        reactions:{include:{
          reaction:{include:{
            user:true
          }}
        }}
      }
      })
      
      return {...post, reqKey: Math.random()}
    } catch {
     throw new Error('post not found')
    }
  }
}
