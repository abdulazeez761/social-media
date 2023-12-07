import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    create(createCommentDto: CreateCommentDto, id: number): void;
    findAll(): import("./entities/comment.entity").Comment[];
    findOne(id: string): string;
}
