import { Controller, Get, Post, Body,  Param,  ParseIntPipe, } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
// import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @Post(":postID")
  create(@Body() createCommentDto: CreateCommentDto, @Param("postID", ParseIntPipe) id: number) {
    return this.commentsService.create(createCommentDto, id);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }


}
