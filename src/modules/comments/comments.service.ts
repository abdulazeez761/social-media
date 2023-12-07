import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PostsService } from 'src/modules/posts/posts.service';
import { Comment } from './entities/comment.entity';
import { UsersService } from 'src/modules/users/users.service';
@Injectable()
export class CommentsService {
  constructor(private readonly postsService: PostsService, private readonly userService: UsersService) { }
  comments: Comment[] = [];

  create(createCommentDto: CreateCommentDto, id) {
    const { author, replyToComment } = createCommentDto;
    const user = this.userService.findOne(author)
    const post = this.postsService.findOne(id);
    let commentID = this.comments.length + 1;

    if (replyToComment) {
      const comment = this.comments.find((comment) => comment.id === replyToComment);
      if (!comment) throw new HttpException('comment does not exist ', HttpStatus.BAD_REQUEST);
      const replyID = comment.comments.length + 1

      const reply = new Comment({
        id: replyID,
        ...createCommentDto
      })
      const replyComment = new Comment({
        id: commentID,
        ...createCommentDto,

      })
      replyComment.addReplyToComment(comment, user)
      this.comments.push(replyComment)

      comment.comments.push(reply)
    } else {
      const comment = new Comment({
        id: commentID,
        ...createCommentDto
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

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
