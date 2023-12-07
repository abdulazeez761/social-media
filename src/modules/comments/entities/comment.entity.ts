
import { Post } from "modules/posts/entities/post.entity";
import { User } from "modules/users/entities/user.entity";
import { CreateCommentDto } from "../dto/create-comment.dto";
import { UpdateCommentDto } from "../dto/update-comment.dto";

export class Comment {
    id!: number;

    text!: string;

    author!: User;

    post!: Post;


    replyToComment!: Comment;

    comments: Comment[] = [];

    constructor(createCommetDto: CreateCommentDto) {
        Object.assign(this, createCommetDto)
    }
    updateOne(updateCommentDto: UpdateCommentDto) {
        Object.assign(this, { ...this, ...updateCommentDto });
    }

    addAuthor(author: User) {
        this.author = author;
    }
    addPost(post: Post) {
        this.post = post;
    }
    addComment(user:User, post:Post) {
        this.addAuthor(user)
        this.addPost(post)
    }

    addReplyToComment(replyto: Comment, user:User) {
        this.addAuthor(user)
        this.replyToComment = { ...replyto } as unknown as Comment;
    }

}