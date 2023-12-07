import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';

@Module({
    imports: [UsersModule, PostsModule, AuthModule, CommentsModule]
})
export class ModulesModule { }
