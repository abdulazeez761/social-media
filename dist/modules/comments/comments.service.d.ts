import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';
import { UsersService } from 'modules/users/users.service';
import { PostsService } from 'modules/posts/posts.service';
export declare class CommentsService {
    private readonly postsService;
    private readonly userService;
    constructor(postsService: PostsService, userService: UsersService);
    comments: Comment[];
    create(createCommentDto: CreateCommentDto, id: number): void;
    findAll(): Comment[];
    findOne(id: number): string;
}
