import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ROUTES } from 'shared/constants/routes.constant';
import { UserID } from 'core/decorators/user-id.decorator';
import { FilterCommentsDto } from './dto/filter-comments.dto';

@Controller(ROUTES.COMMENTS.CONTROLLER)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post(':postID')
  create(
    @Param('postID', new ParseUUIDPipe()) postID: string,
    @Body() createCommentDto: CreateCommentDto,
    @UserID() userID: string,
  ) {
    return this.commentsService.create(createCommentDto, postID, userID);
  }

  // @Get()
  // findAll(@Query() filterCommentsDto: FilterCommentsDto) {
  //   return this.commentsService.findAll(filterCommentsDto);
  // }

  @Get(':commentID')
  findOne(@Param('commentID', new ParseUUIDPipe()) commentID: string) {
    return this.commentsService.findOne(commentID);
  }
  @Get('post/:postID')
  findPostComments(
    @Param('postID', new ParseUUIDPipe()) postID: string,
    @Query() filterCommentsDto: FilterCommentsDto,
  ) {
    return this.commentsService.findPostComments(postID, filterCommentsDto);
  }
  @Patch(':commentID')
  update(
    @Param('commentID', new ParseUUIDPipe()) commentID: string,
    @UserID() userID: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.update(commentID, userID, updateCommentDto);
  }

  @Delete(':commentID')
  remove(
    @Param('commentID', new ParseUUIDPipe()) commentID: string,
    @UserID() userID: string,
  ) {
    return this.commentsService.remove(commentID, userID);
  }
}
