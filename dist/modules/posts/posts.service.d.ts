import { HttpStatus } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { UsersService } from 'modules/users/users.service';
export declare class PostsService {
    private readonly usersService;
    constructor(usersService: UsersService);
    posts: Post[];
    create(createPostDto: CreatePostDto, authorID: number): {
        statusCode: HttpStatus;
        message: string;
    };
    findAll(): Post[];
    findOne(id: number): Post;
    update(id: number, updatePostDto: UpdatePostDto): {
        data: Post;
        message: string;
        statusCode: HttpStatus;
    };
    remove(id: number): {
        data: Post;
        message: string;
        statusCode: HttpStatus;
    };
}
