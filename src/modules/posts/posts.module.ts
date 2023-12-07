import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { UsersModule } from 'modules/users/users.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [UsersModule],
  exports: [PostsService]
})
export class PostsModule { }
