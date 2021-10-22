import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql'
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { ReactionsModule } from './reactions/reactions.module';


@Module({
  imports: [UserModule,
    GraphQLModule.forRoot({
    autoSchemaFile: 'schema.gql',
    debug: false,
    playground: true,
    installSubscriptionHandlers: true,
  }),
    PostsModule,
    CommentsModule,
    ReactionsModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
