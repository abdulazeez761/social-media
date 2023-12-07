import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PostsModule } from 'src/modules/posts/posts.module';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports: [PostsModule, UsersModule]
})
export class CommentsModule { }
