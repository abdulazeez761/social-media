import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PostsService } from 'src/modules/posts/posts.service';
import { Comment } from './entities/comment.entity';
import { UsersService } from 'src/modules/users/users.service';
export declare class CommentsService {
    private readonly postsService;
    private readonly userService;
    constructor(postsService: PostsService, userService: UsersService);
    comments: Comment[];
    create(createCommentDto: CreateCommentDto, id: any): void;
    findAll(): Comment[];
    findOne(id: number): string;
    update(id: number, updateCommentDto: UpdateCommentDto): string;
    remove(id: number): string;
}
