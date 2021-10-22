import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/entities/user.entity';

@ObjectType()
export class Login {
  @Field()
  user: User

  @Field()
  token: string
}
