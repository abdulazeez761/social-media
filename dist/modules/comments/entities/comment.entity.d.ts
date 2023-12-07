import { Post } from "src/modules/posts/entities/post.entity";
import { User } from "src/modules/users/entities/user.entity";
import { CreateCommentDto } from "../dto/create-comment.dto";
import { UpdateCommentDto } from "../dto/update-comment.dto";
export declare class Comment {
    id: number;
    text: string;
    author: User;
    post: Post;
    replyToComment: Comment;
    comments: Comment[];
    constructor(createCommetDto: CreateCommentDto);
    updateOne(updateCommentDto: UpdateCommentDto): void;
    addAuthor(author: User): void;
    addPost(post: Post): void;
    addComment(user: any, post: any): void;
    addReplyToComment(replyto: Comment, user: any): void;
}
