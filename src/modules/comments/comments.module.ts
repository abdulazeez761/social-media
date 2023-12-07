import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PostsModule } from 'modules/posts/posts.module';
import { UsersModule } from 'modules/users/users.module';


@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports: [PostsModule, UsersModule]
})
export class CommentsModule { }
