import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { Login } from './dto/jwt.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => Login)
  Register(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.Register(createUserInput);
  }
  
  @Mutation(()=> User)
  DeleteUser(@Args('id', {type: ()=> Number}) id: number){
    return this.userService.DeleteUser(id)
  }
  
  @Mutation(()=> Login)
  Login(@Args('loginUserInput') loginUserInput: LoginUserInput){
    return this.userService.Login(loginUserInput)
  }

  @Query(() => [User])
  getUsers() {
    return this.userService.getUsers();
  }

}
