import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(createPostDto: CreatePostDto, authorID: number): {
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    };
    findAll(): import("./entities/post.entity").Post[];
    findOne(id: string): import("./entities/post.entity").Post;
    update(id: string, updatePostDto: UpdatePostDto): {
        data: import("./entities/post.entity").Post;
        message: string;
        statusCode: import("@nestjs/common").HttpStatus;
    };
    remove(id: string): {
        data: import("./entities/post.entity").Post;
        message: string;
        statusCode: import("@nestjs/common").HttpStatus;
    };
}
