import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';
import { UsersService } from 'modules/users/users.service';
import { PostsService } from 'modules/posts/posts.service';
@Injectable()
export class CommentsService {
  constructor(private readonly postsService: PostsService, private readonly userService: UsersService) { }
  comments: Comment[] = [];

  create(createCommentDto: CreateCommentDto, id: number) {
    const { author, replyToComment } = createCommentDto;
    const user = this.userService.findOne(author)
    const post = this.postsService.findOne(id);
    let commentID = this.comments.length + 1;

    if (replyToComment) {
      const comment = this.comments.find((comment) => comment.id === replyToComment);
      if (!comment) throw new HttpException('comment does not exist ', HttpStatus.BAD_REQUEST);
      const replyID = comment.comments.length + 1

      const reply = new Comment({
        ...createCommentDto,
        id: replyID
      })
      const replyComment = new Comment({
        ...createCommentDto,
        id: commentID
      })
      replyComment.addReplyToComment(comment, user)
      this.comments.push(replyComment)

      comment.comments.push(reply)
    } else {
      const comment = new Comment({
        ...createCommentDto,
          id: commentID,
      })
      comment.addComment(user, post)
      this.comments.push(comment)
    }
  }

  findAll() {
    return this.comments;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }


}
